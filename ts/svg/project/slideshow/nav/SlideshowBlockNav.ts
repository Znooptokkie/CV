import { SVGFactory } from "../../../construct/core/SVGFactory.js";
import { SlideshowContext } from "../main/SlideshowContext.js";


export class SlideshowBlockNav
{
    constructor(protected context: SlideshowContext) {}
    
    public createNavBlocks(projectName: string): void
    {
        const group = new SVGFactory(this.context.svg.svg, "g", {
            class: `block-navigation-group-${projectName}`
        }).createSvgTag()

        // Top
        new SVGFactory(group, "path", {
            d: "M685,100 L745,45 L1075,45 L1135,100 L685,100 Z",
            id: "slideshow-next-button",
            stroke: "rgb(51, 81, 142)",
            fill: "rgba(51, 81, 142, 0.2)", // Moet transparent zijn, anders werkt klikken niet????
            "stroke-width": 3
        }).createSvgTag()

        // Top Arrow
        new SVGFactory(group, "path", {
            d: "M910,60 L925,85 L895,85 L910,60 Z",
            stroke: "none",
            fill: "rgb(51, 81, 142)"
        }).createSvgTag()

        // Bottom
        new SVGFactory(group, "path", {
            d: "M685,1300 L1135,1300 L1075,1355 L745,1355 L685,1300 Z",
            id: "slideshow-previous-button",
            stroke: "rgb(51, 81, 142)",
            fill: "rgba(51, 81, 142, 0.2)",
            "stroke-width": 3
        }).createSvgTag()
        
        // Bottom Arrow
        new SVGFactory(group, "path", {
            d: "M910,1340 L925,1315 L895,1315 L910,1340 Z",
            stroke: "none",
            fill: "rgb(51, 81, 142)"
        }).createSvgTag()
    }
}