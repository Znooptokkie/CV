
import { CreateSVG } from "../../construct/core/SVGCreate.js"
import { SVGFactory } from "../../construct/core/SVGFactory.js"
import { DeconstructPath } from "../../construct/DeconstructPath.js"


/* =========================
   CORE SVG INSTANCE
========================= */

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


/* =========================
   SHARED CONTEXT
========================= */

export class SlideshowContext
{
    svg: SlideshowMainInstance
    boxes: Box[] = []
    decorations: SlideshowMainDecoration[] = []
    lines: SlideshowMainDrawLines[] = []

    constructor(svg: SlideshowMainInstance)
    {
        this.svg = svg
    }
}


/* =========================
   DRAW LINES
========================= */

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
            stroke: "rgba(8, 63, 174, 1)",
            "stroke-width": 8,
            fill: "none"
        }).createSvgTag()
    }
}

export class SlideshowInnerContent
{
    constructor(
        private context: SlideshowContext,
    ) {}

    public drawInnerContentBorder(): void
    {
        const { svg } = this.context

        new SVGFactory(svg.svg, "path", {
            // d: "M120,120 L1880,120 L1880,165 L1860,180 L1860,260 L1850,270 L1850,1200 L1840,1210 L1840,1280 L160,1280 L160,1220 L150,1200 L150,270 L140,260 L140,180 L120,165 L120,120",
            d: "M120,120 L1880,120 L1880,165 L1860,180 L1860,260 L1850,270 L1850,1200 L1840,1210 L1840,1280 L160,1280 L160,1220 L150,1210 L150,270 L140,260 L140,180 L120,165 L120,120",
            stroke: "red",
            fill: "none"
        }).createSvgTag()
    }
}

/* =========================
   DECORATIONS
========================= */

export class SlideshowMainDecoration
{
    constructor(
        private context: SlideshowContext,
        private pathCorner: string
    )
    {
        context.decorations.push(this)
    }

    public drawCornerDecorations(): void
    {

    }

    public drawTopBottomBlockDecoration(): void
    {

    }

    public drawTopDecorations(): void
    {

    }
}


/* =========================
   BOX
========================= */

type BoxValues = {
    width: number
    height: number
    halfwayWidth: number
    halfwayHeight: number
}

type Point = {
    x: number
    y: number
}

export class Box
{
    private id: number
    private static boxPosition = 0

    constructor(private context: SlideshowContext)
    {
        this.id = Box.boxPosition
        Box.boxPosition += 1
        context.boxes.push(this)

        // AUTOMATISCH DECORATIES TEKENEN IN ELKE BOX
        this.drawBoxDecorations()
    }

    public getBoxSizeValues(): BoxValues
    {
        return {
            width: this.context.svg.viewboxWidth,
            height: this.context.svg.viewboxHeight,
            halfwayWidth: this.context.svg.viewboxWidth / 2,
            halfwayHeight: this.context.svg.viewboxHeight / 2
        }
    }

    private drawBoxDecorations(): void
    {
        const { svg } = this.context

        const group = new SVGFactory(svg.svg, "g", {
            class: `slideshow-svg-box-decoartion-${this.id}`
        }).createSvgTag()

        const cornerOrnamentPaths =  {
            LeftTopCorner: "M100,170 L120,190 L120,270 L100,250",
            leftBottomCorner: "M125,1205 L145,1225 L145,1300 L125,1300"
        } 

        const newLeftTopCorner = this.calcPathPositionsInBox(cornerOrnamentPaths.LeftTopCorner)
        const newLeftBottomCorner = this.calcPathPositionsInBox(cornerOrnamentPaths.leftBottomCorner)

        // Kleine ruit-actige figuren in de hoeken
        new SVGFactory(group, "path", {
            d: this.id === 0 ? cornerOrnamentPaths.LeftTopCorner : newLeftTopCorner,
            stroke: "none",
            fill: "rgba(8, 63, 174, 1)"
        }).createSvgTag()

        new SVGFactory(group, "path", {
            d: this.id === 0 ? cornerOrnamentPaths.leftBottomCorner : newLeftBottomCorner,
            stroke: "none",
            fill: "rgba(8, 63, 174, 1)"
        }).createSvgTag()

        const topLeftOrnamentLines = {
            ornamentUnderline: "M820,5 L735,85 L425,85",
            ornamentUpperline: "M780,15 L600,15 L545,70 L475,70"
        }

        const newOrnamentUnderline = this.calcPathPositionsInBox(topLeftOrnamentLines.ornamentUnderline)
        const newOrnamentUpperline = this.calcPathPositionsInBox(topLeftOrnamentLines.ornamentUpperline)

        // Top underline
        new SVGFactory(group, "path", {
            d: this.id === 0 ? topLeftOrnamentLines.ornamentUnderline : newOrnamentUnderline,
            stroke: "rgba(8, 63, 174, 1)",
            "stroke-width": 4,
            fill: "none"
        }).createSvgTag()

        // Top upperline
        new SVGFactory(this.context.svg.svg, "path", {
            d: this.calcPathPositionsInBox(topLeftOrnamentLines.ornamentUpperline),
            stroke: "rgba(8, 63, 174, 1)",
            "stroke-width": 4,
            fill: "none"
        }).createSvgTag()

        const topLeftOrnamentBlocks = {
            ornamentFirstBlock: "M793,30 L735,85 L705,85 L763,30 L793,30",
            ornamentSeconBlock: "M743,30 L685,85 L655,85 L713,30 L743,30",
            ornamentThirdBlock: "M693,30 L635,85 L605,85 L663,30 L693,30",
            ornamentFourtBlock: "M643,30 L585,85 L555,85 L613,30 L643,30"
        }

        const newFirstBlock = this.calcPathPositionsInBox(topLeftOrnamentBlocks.ornamentFirstBlock)
        const newSeconBlock = this.calcPathPositionsInBox(topLeftOrnamentBlocks.ornamentSeconBlock)
        const newThirdBlock = this.calcPathPositionsInBox(topLeftOrnamentBlocks.ornamentThirdBlock)
        const newFourtBlock = this.calcPathPositionsInBox(topLeftOrnamentBlocks.ornamentFourtBlock)

        // Eerst schuine blok (vanaf rechts)
        new SVGFactory(this.context.svg.svg, "path", {
            d: this.id === 0 ? topLeftOrnamentBlocks.ornamentFirstBlock : newFirstBlock,
            stroke: "rgba(8, 63, 174, 1)",
            "stroke-width": 4,
            fill: "rgba(8, 63, 174, 0.2)"
        }).createSvgTag()

        // Tweede schuine blok
        new SVGFactory(this.context.svg.svg, "path", {
            d: this.id === 0 ? topLeftOrnamentBlocks.ornamentSeconBlock : newSeconBlock,
            stroke: "rgba(8, 63, 174, 1)",
            "stroke-width": 4,
            fill: "rgba(8, 63, 174, 0.2)"
        }).createSvgTag()

        // Derde schuine blok
        new SVGFactory(this.context.svg.svg, "path", {
            d: this.id === 0 ? topLeftOrnamentBlocks.ornamentThirdBlock : newThirdBlock,
            stroke: "rgba(8, 63, 174, 1)",
            "stroke-width": 4,
            fill: "rgba(8, 63, 174, 0.2)"
        }).createSvgTag()

        // Vierdde schuine blok
        new SVGFactory(this.context.svg.svg, "path", {
            d: this.id === 0 ? topLeftOrnamentBlocks.ornamentFourtBlock : newFourtBlock,
            stroke: "rgba(8, 63, 174, 1)",
            "stroke-width": 4,
            fill: "rgba(8, 63, 174, 0.2)"
        }).createSvgTag()

        const topLeftOrnamentLayingBlocks = {
            ornamentFirstLayBlock: "M400,85 L325,85 L315,75 L390,75 L400,85",
            ornamentSeconLayBlock: "M300,85 L225,85 L215,75 L290,75 L300,85",
        }

        const newFirstLayBlock = this.calcPathPositionsInBox(topLeftOrnamentLayingBlocks.ornamentFirstLayBlock)
        const newSeconLayBlock = this.calcPathPositionsInBox(topLeftOrnamentLayingBlocks.ornamentSeconLayBlock)

        // Eerst liggen blok (vanaf rechts)
        new SVGFactory(this.context.svg.svg, "path", {
            d: this.id === 0 ? topLeftOrnamentLayingBlocks.ornamentFirstLayBlock : newFirstLayBlock,
            stroke: "rgba(8, 63, 174, 1)",
            "stroke-width": 4,
            fill: "rgba(8, 63, 174, 0.2)"
        }).createSvgTag()

        new SVGFactory(this.context.svg.svg, "path", {
            d: this.id === 0 ? topLeftOrnamentLayingBlocks.ornamentSeconLayBlock : newSeconLayBlock,
            stroke: "rgba(8, 63, 174, 1)",
            "stroke-width": 4,
            fill: "rgba(8, 63, 174, 0.2"
        }).createSvgTag()









        // Top-bottom block decoration
        new SVGFactory(group, "path", {
            d: "M775,100 L835,45 L1165,45 L1225,100 L775,100 Z",
            stroke: "rgba(8, 63, 174, 1)",
            fill: "rgba(8, 63, 174, 0.2)",
            "stroke-width": 4
        }).createSvgTag()

        new SVGFactory(group, "path", {
            d: "M775,1300 L1225,1300 L1165,1355 L835,1355 L775,1300 Z",
            stroke: "red",
            fill: "rgba(8, 63, 174, 0.2)",
            "stroke-width": 4
        }).createSvgTag()
    }

    private calcPathPositionsInBox(path: string): string
    {
        const listPathPoints: Point[] = DeconstructPath.getPathParts(path)

        if (this.id === 1)
        {
            return this.mirrorPathVertical(listPathPoints)!
        }

        return path
    }

    private mirrorPathVertical(pathPoints: Point[])
    {
        // 1. Positie verplaatsen
        // 2. punten veranderen

        // Max breedte/hoogte van het path ophalen
        // Verticale/horzintale lijn in het midden
        // Alles links/erboven van de lijn moet naar rechts/onder, en andersom


        // PUNTEN VERANDEREN:

        // BOX 0:
        //  - Alles blijft hetzelfde
        //
        // BOX 1:
        //  - De paths moeten VERTICAAL geflipt worden
        //
        // BOX 2:
        //  - De paths moeten HORIZONTAAL geflipt worden
        //
        // BOX 3:
        //  - De paths moeten HORIZONTAAL & VERTICAAL geflipt worden

        if (this.id === 1)
        {
            const halfwayPoint = Math.min(...pathPoints.map(p => p.x))

            const halfwayHorizontal = halfwayPoint + this.calcPathVerticalMid(pathPoints)

            const newXValue = this.calcPathWidth(pathPoints)

            
            const newPathPoints = pathPoints.map(p => ({
                x: p.x < halfwayHorizontal
                ? p.x + newXValue
                : p.x - newXValue,
                y: p.y
            }));

            const newXPosition = this.calcPathDifference(pathPoints)
            
            return DeconstructPath.createNewSVGPathString(newXPosition)
        }
    }

    private calcPathDifference(pathPoints: Point[])
    {
        const newPosition = pathPoints.map(p => ({
            x: this.getBoxSizeValues().width - p.x,
            y: p.y
        }))

        return newPosition
    }

    private calcPathWidth(pathPoints: Point[])
    {
            const max = Math.max(...pathPoints.map(p => p.x))
            const min = Math.min(...pathPoints.map(p => p.x))
            return max - min
    }

    private calcPathHeight(pathPoints: Point[])
    {
            const max = Math.max(...pathPoints.map(p => p.y))
            const min = Math.min(...pathPoints.map(p => p.y))
            return max - min
    }

    private calcPathVerticalMid(pathPoints: Point[])
    {
        return this.calcPathWidth(pathPoints) / 2
    }
}



/* =========================
   INIT
========================= */

export function initSlideshow(): void
{
    const svg = new SlideshowMainInstance()
    const context = new SlideshowContext(svg)
    
    const pathMain =
        "M100,100 L745,100 L825,25 L1175,25 L1255,100 L1900,100 L1900,250 L1875,275 L1875,1300 L1255,1300 L1175,1375 L825,1375 L745,1300 L125,1300 L125,275 L100,250 L100,100 Z"

    const lines = new SlideshowMainDrawLines(context, pathMain)
    lines.drawContour()

    const decoration = new SlideshowMainDecoration(
        context,
        "M100,170 L120,190 L120,270 L100,250"
    )

    decoration.drawCornerDecorations()
    decoration.drawTopBottomBlockDecoration()
    decoration.drawTopDecorations()

    new Box(context)
    new Box(context)

    new SlideshowInnerContent(context).drawInnerContentBorder()
}
