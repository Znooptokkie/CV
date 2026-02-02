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
                stroke: counter <= 2 ? "none" : "rgba(51, 81, 142, 1)",
                fill: counter <= 2 ? "rgba(51, 81, 142, 1)" : "none"
            }).createSvgTag()

            counter++
        })
    }
}