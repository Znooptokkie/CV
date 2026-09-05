import { ProjectImageSlideshowType } from "../../../../../types/projects.type.js";
import { SVGFactory } from "../../../../construct/core/SVGFactory.js"
import { DeconstructPath } from "../../../../construct/DeconstructPath.js";
import { HexaStyling } from "../../../../sharedHexStyling/HexaStyling.js";
import { SlideshowState } from "../../nav/SlideshowState.js"

export abstract class AbstractSmallSlideshow
{
    protected container: HTMLElement | null = document.getElementById("svg-images-list-container");

    protected SVG: SVGElement | null = null;
    protected defs: SVGElement | null = null;
    protected coords: Array<{ x: number; y: number }> | null = null

    constructor(
        protected state: SlideshowState,
        protected projectName: string
    )
    {
        this.state.subscribe(() => this.render());
        this.render();
    }

    private render()
    {
        if (!this.container) 
            return null;

        this.container.replaceChildren();
        this.build();
    }

    protected abstract build(): void;
}

export class SmallSVGSlideshow extends AbstractSmallSlideshow
{
    protected build(): void
    {
        if (!this.container) 
            return;

        this.createMainSVG();
        this.createDefs();
        this.createDynamicPathCoords()
        this.drawRaster()
        this.drawImages();
    }

    private createMainSVG(): void
    {
        this.SVG = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );

        this.SVG.setAttribute("viewBox", "0 -75 500 1100");
        this.SVG.classList.add("slideshow-small-main-svg");

        this.container?.appendChild(this.SVG);
    }

    private createDefs(): void
    {
        this.defs = new SVGFactory(this.SVG, "defs", {
            id: `small-slideshow-defs-${this.projectName}`
        }).createSvgTag()

        HexaStyling.createInnerShadowDefs(this.defs, this.projectName)
    }

    private createDynamicPathCoords(): void
    {
        const maxSlots = Math.min(this.state.projectImages.length, 8)
        this.coords = SmallSVGImagesSlideshow.calcNewCoords(maxSlots)
    }

    private drawImages(): void
    {
        if (!this.SVG || !this.coords) 
            return;

        const maxVisible = 7;
        const totalImages = this.state.projectImages.length;

        const start = this.state.windowStartIndex;
        const end = Math.min(start + maxVisible, totalImages);
        const visibleImages = this.state.projectImages.slice(start, end);

        let counter = 0;

        visibleImages.forEach(img => {
            SmallSVGImagesSlideshow.createClipPaths(
                this.defs,
                this.projectName,
                counter,
                this.coords!
            )

            SmallSVGImagesSlideshow.createSmallImages(
                this.SVG,
                this.projectName,
                counter,
                img,
                this.coords!,
                start + counter,
                this.state
            )

            counter++;
        });

        if (totalImages > maxVisible) 
        {
            const remaining = totalImages - maxVisible;
            const overflowIndex = counter;

            SmallSVGImagesSlideshow.createClipPaths(
                this.defs,
                this.projectName,
                overflowIndex,
                this.coords!
            )

            SmallSVGImagesSlideshow.createOverflowTile(
                this.SVG,
                this.projectName,
                overflowIndex,
                remaining,
                this.coords!
            )
        }
    }

    private drawRaster(): void 
    {
        if (!this.SVG || !this.coords) 
            return

        const hexPath = [
            { x: 110, y: 15 },
            { x: 210, y: 15 },
            { x: 260, y: 115 },
            { x: 210, y: 215 },
            { x: 110, y: 215 },
            { x: 60, y: 115 },
            { x: 110, y: 15 }
        ];

        const offsetX = 60; 
        const offsetY = 60;

        let rasterPath = "";

        this.coords.forEach(coord => {
            hexPath.forEach((p, idx) => {
                const x = p.x + coord.x + offsetX;
                const y = p.y + coord.y + offsetY;

                rasterPath += (idx === 0 ? "M" : "L") + `${x},${y} `;
            });
        });

        const pathEl = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );

        pathEl.setAttribute("d", rasterPath.trim());
        pathEl.setAttribute("fill", "none");
        pathEl.setAttribute("stroke", "rgba(51, 81, 142, 0.5)");
        pathEl.setAttribute("stroke-width", "2");

        this.SVG.appendChild(pathEl);
    }
}

export class SmallSVGImagesSlideshow
{
    public static createClipPaths(
        defs: SVGElement | null, 
        projectName: string, 
        counter: number,
        coords: Array<{ x: number; y: number }>
    ): void
    {
        const path = "M110,15 L210,15 L260,115 L210,215 L110,215 L60,115 L110,15"

        const hashPath = DeconstructPath.getPathParts(path)

        const newCoords = hashPath.map(c => ({
            x: c.x + coords[counter].x,
            y: c.y + coords[counter].y
        }));

        const newPath = DeconstructPath.createNewSVGPathString(newCoords)

        const clipPath = new SVGFactory(defs, "clipPath", {
            id: `hex-image-${projectName}-${counter}`,
            clipPathUnits: "userSpaceOnUse"
        }).createSvgTag()

        new SVGFactory(clipPath, "path", {
            d: newPath
        }).createSvgTag()
    }

    public static createSmallImages(
        SVG: SVGElement | null,
        projectName: string, 
        counter: number,
        img: ProjectImageSlideshowType,
        coords: Array<{ x: number; y: number }>,
        imageIndex: number,
        state: SlideshowState
    ): void
    {
        const offsetX = 60;
        const offsetY = 15;

        const group = new SVGFactory(SVG, "g", {
            "clip-path": `url(#hex-image-${projectName}-${counter})`,
            class: "hexa-image",
            cursor: "pointer"
        }).createSvgTag()

        group?.addEventListener("click", () =>
        {
            state.setActive(imageIndex)
        })

        new SVGFactory(group, "image", {
            href: `../static/images/${img.image_url}`,
            x: coords[counter].x + offsetX,
            y: coords[counter].y + offsetY,
            width: 200,
            height: 200,
            preserveAspectRatio: "xMidYMid slice"
        }).createSvgTag()

        HexaStyling.activeImageStyling(
            img,
            group,
            coords,
            counter
        )

        // Alle images een inner shadow, behalve de active image
        if (!img.is_active)
        {
            HexaStyling.createInnerShadow(
                group,
                coords[counter].x,
                coords[counter].y,
                projectName,
                "small"
            );
        }
    }
    
    public static createOverflowTile(
        SVG: SVGElement | null,
        projectName: string,
        counter: number,
        remaining: number,
        coords: Array<{ x: number; y: number }>
    ): void
    {
        const group = new SVGFactory(SVG, "g", {
            "clip-path": `url(#hex-image-${projectName}-${counter})`,
        }).createSvgTag();

        const path = "M110,15 L210,15 L260,115 L210,215 L110,215 L60,115 L110,15";

        const hashPath = DeconstructPath.getPathParts(path);

        const newCoords = hashPath.map(c => ({
            x: c.x + coords[counter].x,
            y: c.y + coords[counter].y
        }));

        const newPath = DeconstructPath.createNewSVGPathString(newCoords);

        new SVGFactory(group, "path", {
            d: newPath,
            fill: "rgba(51, 81, 142, 0.2)",
            stroke: "rgb(51, 81, 142)",
            "stroke-width": "6"
        }).createSvgTag();

        const textEl = new SVGFactory(group, "text", {
            x: coords[counter].x + 160,
            y: coords[counter].y + 125,
            "text-anchor": "middle",
            "font-size": "34",
            "font-weight": "bold",
            fill: "rgb(51, 81, 142)",
        }).createSvgTag();

        if (textEl) 
        {
            textEl.textContent = `${remaining} meer...`;
            textEl.style.userSelect = "none"
        }
    }

    public static calcNewCoords(
        count: number
    ): Array<{ x: number; y: number }> 
    {
        const width = 200;
        const height = 200;

        const coords: { x: number; y: number }[] = [];

        for (let i = 0; i < count; i++) 
        {
            const col = i % 2;
            const row = Math.floor(i);

            const x = col * (width * 0.85);
            const y = row * (height * 0.55);

            coords.push({ x, y });
        }

        return coords;
    }
}