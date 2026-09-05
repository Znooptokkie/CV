import { ProjectImageSlideshowType } from "../../types/projects.type.js";
import { SVGFactory } from "../construct/core/SVGFactory.js";
import { DeconstructPath } from "../construct/DeconstructPath.js";

export class HexaStyling
{
    public static createInnerShadowDefs(
        defs: SVGElement | null,
        projectName: string
    ): void
    {
        // Anders werkt het toekennen van de <defs> niet voor de inner shadow
        if (projectName == "smart garden (desktop)")
            projectName = "smartgarden-desktop"
        if (projectName == "smart garden (mobiel)")
            projectName = "smartgarden-mobiel"

        const shadowGradient = new SVGFactory(defs, "linearGradient", {
            id: `hexa-shadow-${projectName}`,
            x1: "0%",
            y1: "0%",
            x2: "100%",
            y2: "100%"
        }).createSvgTag();

        new SVGFactory(shadowGradient, "stop", {
            offset: "0%",
            "stop-color": "black",
            "stop-opacity": "0.9"
        }).createSvgTag();

        new SVGFactory(shadowGradient, "stop", {
            offset: "30%",
            "stop-color": "black",
            "stop-opacity": "0.55"
        }).createSvgTag();

        new SVGFactory(shadowGradient, "stop", {
            offset: "70%",
            "stop-color": "black",
            "stop-opacity": "0.1"
        }).createSvgTag();

        new SVGFactory(shadowGradient, "stop", {
            offset: "100%",
            "stop-color": "black",
            "stop-opacity": "0"
        }).createSvgTag();

        const shadowBlur = new SVGFactory(defs, "filter", {
            id: `hexa-blur-${projectName}`,
            x: "-50%",
            y: "-50%",
            width: "200%",
            height: "200%"
        }).createSvgTag();

        new SVGFactory(shadowBlur, "feGaussianBlur", {
            in: "SourceGraphic",
            stdDeviation: "10"
        }).createSvgTag();
    }

    public static createInnerShadow(
        group: SVGElement | null,
        x: number,
        y: number,
        projectName: string,
        imageSize: string
    ): void
    {
        if (!group)
            return;

        // Moet dynamischer (DRY), maar veel hoofdpijn...
        if (imageSize == "small")
        {
            new SVGFactory(group, "path", {
                d: `
                    M${x + 90},${y + 5}
                    L${x + 230},${y + 5}
                    L${x + 245},${y + 55}
                    L${x + 140},${y + 45}
                    L${x + 65},${y + 180}
                    L${x + 40},${y + 150}
                    Z
                `,
                fill: `url(#hexa-shadow-${projectName})`,
                filter: `url(#hexa-blur-${projectName})`,
                "pointer-events": "none"
            }).createSvgTag();
        }
        else
        {
            new SVGFactory(group, "path", {
                d: `
                    M${x - 10},${y + 167}
                    L${x + 250},${y - 10}
                    L${x + 325},${y + 50}
                    L${x + 55},${y + 205}
                    L${x + 55},${y + 475}
                    L${x - 10},${y + 433}
                    Z
                `,
                fill: `url(#hexa-shadow-${projectName})`,
                filter: `url(#hexa-blur-${projectName})`,
                "pointer-events": "none"
            }).createSvgTag();
        }
    }

    public static activeImageStyling(
        img: ProjectImageSlideshowType,
        group: SVGElement | null,
        coords: Array<{ x: number; y: number }>,
        counter: number
    )
    {
        const path = "M110,15 L210,15 L260,115 L210,215 L110,215 L60,115 L110,15"

        const hashPath = DeconstructPath.getPathParts(path)

        const overlayCoords = hashPath.map(c => ({
            x: c.x + coords[counter].x,
            y: c.y + coords[counter].y
        }))

        const overlayPath = DeconstructPath.createNewSVGPathString(overlayCoords)

        new SVGFactory(group, "path", {
            d: overlayPath,
            fill: img.is_active
                ? "transparent"
                : "rgba(0,0,0, 0.35)"
        }).createSvgTag()

        if (!img.is_active)
        {
            const outlinePath = DeconstructPath.createNewSVGPathString(overlayCoords)

            new SVGFactory(group, "path", {
                d: outlinePath,
                fill: "none",
                stroke: "transparent",
                "stroke-width": "6",
                class: "hex-outline",
                "pointer-events": "none"
            }).createSvgTag()
        }
    }
}