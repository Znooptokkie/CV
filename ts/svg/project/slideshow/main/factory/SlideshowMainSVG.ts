import { CreateSVG } from "../../../../construct/core/SVGCreate.js"
import { SVGFactory } from "../../../../construct/core/SVGFactory.js"
import { SlideshowContext } from "../SlideshowContext.js"


export class SlideshowMainInstance
{
    private SVG: CreateSVG | null = null
    protected HTMLID: string = "svg-slideshow-main"
    public viewboxWidth: number = 2000
    public viewboxHeight: number = 1400

    private createSVGElement(): CreateSVG
    {
        return new CreateSVG(
            this.HTMLID,
            {
                viewBox: `0 0 ${this.viewboxWidth} ${this.viewboxHeight}`,
                preserveAspectRatio: "xMidYMid meet"
            },
            true
        )
    }

    public get svg(): CreateSVG
    {
        if (!this.SVG)
            this.SVG = this.createSVGElement()

        return this.SVG
    }
}


export class SlideshowMainDrawLines
{
    constructor(
        private context: SlideshowContext,
        private path: string
    )
    {
        context.lines.push(this)
    }

    public drawContour(): void
    {
        new SVGFactory(this.context.svg.svg, "path", {
            d: this.path,
            stroke: "rgb(51, 81, 142)",
            "stroke-width": 6,
            fill: "none"
        }).createSvgTag()
    }
}
