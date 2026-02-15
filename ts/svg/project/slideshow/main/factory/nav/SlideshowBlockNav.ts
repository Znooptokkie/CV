import { SVGFactory } from "../../../../../construct/core/SVGFactory.js";


export class SlideshowBlockNav
{
    public createTopDecoration(group: SVGElement | null): void
    {
        // Top
        new SVGFactory(group, "path", {
            d: "M775,100 L835,45 L1165,45 L1225,100 L775,100 Z",
            stroke: "rgb(51, 81, 142)",
            fill: "rgb(51, 81, 142)",
            "stroke-width": 4
        }).createSvgTag()

        // Bottom
        new SVGFactory(group, "path", {
            d: "M775,1300 L1225,1300 L1165,1355 L835,1355 L775,1300 Z",
            stroke: "rgb(51, 81, 142)",
            fill: "rgb(51, 81, 142)",
            "stroke-width": 4
        }).createSvgTag()
    }
}