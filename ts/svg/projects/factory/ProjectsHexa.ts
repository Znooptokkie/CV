import { CreateSVG } from "../../construct/core/SVGCreate.js";
import { SVGFactory } from "../../construct/core/SVGFactory.js";

export class ProjectsHexa
{
    public static styleLogo(container: CreateSVG, figures: Array<string>): void
    {
        let counter = 0

        figures.forEach((path) => {
            const borders = new SVGFactory(container, "path", {
                d: path,
                stroke: counter <= 2 ? "none" : "rgb(51, 81, 142)",
                fill: counter <= 2 ? "rgb(51, 81, 142)" : "none"
            }).createSvgTag()

            counter++
        })
    }
}