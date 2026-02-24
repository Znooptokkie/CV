import { ProjectImageSlideshowType } from "../../../../../types/projects.type.js";
import { SVGFactory } from "../../../../construct/core/SVGFactory.js"
import { DeconstructPath } from "../../../../construct/DeconstructPath.js";
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
        this.drawImages();
    }

    private createMainSVG(): void
    {
        this.SVG = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );

        this.SVG.setAttribute("viewBox", "0 0 500 1000");
        this.SVG.classList.add("slideshow-small-main-svg");

        this.container?.appendChild(this.SVG);
    }

    private createDefs(): void
    {
        this.defs = new SVGFactory(this.SVG, "defs", {
            id: `small-slideshow-defs-${this.projectName}`
        }).createSvgTag()
    }

    private createDynamicPathCoords(): void
    {
        this.coords = SmallSVGImagesSlideshow.calcNewCoords(this.state.projectImages)
    }

    private drawImages(): void
    {
        if (!this.SVG) 
            return;

        let counter = 0

        this.state.projectImages.forEach(img => {

            SmallSVGImagesSlideshow.createClipPaths(this.defs, this.projectName, counter, this.coords!)

            // Voeg Images toe aan ClipPath
            SmallSVGImagesSlideshow.createSmallImages(this.SVG, this.projectName, counter, img, this.coords!)
            
            counter++
        });
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
        const path = "M50,0 L150,0 L200,100 L150,200 L50,200 L0,100 L50,0"
        const hashPath = DeconstructPath.getPathParts(path)
        const newCoords: { x: number; y: number }[] = hashPath.map(c => ({
            x: c.x + coords[counter].x,
            y: c.y + coords[counter].y
        }));
        const newPath = DeconstructPath.createNewSVGPathString(newCoords)
        // console.log(newPath);

        const clipPath = new SVGFactory(defs, "clipPath", {
            id: `small-hex-image-${projectName}-${counter}`,
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
        coords: Array<{ x: number; y: number }>
    ): void
    {
        const group = new SVGFactory(SVG, "g", {
            "clip-path": `url(#small-hex-image-${projectName}-${counter})`
        }).createSvgTag()

        new SVGFactory(group, "image", {
            href: `../static/images/${img.image_url}`,
            x: coords[counter].x,
            y: coords[counter].y,
            width: 200,
            height: 200,
            preserveAspectRatio: "xMidYMid slice"
        }).createSvgTag()

        // new SVGFactory(group, "rect", {
        //     x: coords[counter].x,
        //     y: coords[counter].y,
        //     width: 200,
        //     height: 200,
        //     fill: img.is_active ? "green" : "red",
        //     opacity: "0.5",
        // }).createSvgTag()
    }

    public static calcNewCoords(projectImages: ProjectImageSlideshowType[]): Array<{ x: number; y: number }> 
    {
        const width = 200;
        const height = 200;
        const coords: { x: number; y: number }[] = [];

        for (let i = 0; i < projectImages.length; i++) 
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