import { CreateSVG } from "../../construct/core/SVGCreate.js"
import { SVGFactory } from "../../construct/core/SVGFactory.js"


export class SlideshowMainInstance
{
    private SVG: CreateSVG | null = null
    protected HTMLID: string = "svg-slideshow-main"
    protected viewboxWidth: number = 2000 
    protected viewboxHeight: number = 1400
    // padding = 100

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
    // protected path: string = "M100,100 L725,100 L750,125 L1250,125 L1275,100 L1900,100 L1900,250 L1875,275 L1875,1300 L1575,1300 L1500,1225 L500,1225 L425,1300 L125,1300 L125,275 L100,250 L100,100"

    constructor(
        private svgInstance: SlideshowMainInstance,
        private path: string
    )
        {

        }

    public drawContour(): void
    {
        new SVGFactory(this.svgInstance.svg, "path", {
            d: this.path,
            stroke: "red",
            "stroke-width": 20,
            fill: "none"
        }).createSvgTag()
    }
}

export class SlideshowMainDecoration
{
    // protected cornerTriangle: string = "M125,125 L225,125"

    constructor(
        private svgInstance: SlideshowMainInstance, 
        private pathCorner: string
    )
    {

    }

    public drawCorner(): void
    {
        new SVGFactory(this.svgInstance.svg, "path", {
            d: this.pathCorner,
            stroke: "green"
        }).createSvgTag()
    }
}












export function initSlideshow(): void
{
    const svg = new SlideshowMainInstance()

    // const pathMain = "M100,100 L725,100 L750,125 L1250,125 L1275,100 L1900,100 L1900,250 L1875,275 L1875,1300 L1575,1300 L1500,1225 L500,1225 L425,1300 L125,1300 L125,275 L100,250 L100,100"
    const pathMain = "M200,100 L350,100 L375,125 L675,125 L700,100 L1250,100 L1275,125 L1600,125 L1626,100 L1850,100 1900,150 1900,400 L1825,475 L1825,1100 L1900,1175 L1900,1250 L1850,1300"
    const lines = new SlideshowMainDrawLines(svg, pathMain)
    lines.drawContour()

    const pathTriangle = "M125,125 L225,125"
    const decoration = new SlideshowMainDecoration(svg, pathTriangle)
    decoration.drawCorner()
    console.log("mkay");
}