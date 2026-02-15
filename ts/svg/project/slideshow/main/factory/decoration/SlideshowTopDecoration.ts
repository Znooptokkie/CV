import { SVGFactory } from "../../../../../construct/core/SVGFactory.js";
import { SlideshowContext } from "../../SlideshowContext.js";
import { CalcPathPositionsInBox } from "../calculation/CalcPathPositionInBox.js";


export class SlideshowTopDecoration
{
    private decorationLines: Record<string, string> = 
    {
        ornamentUnderline: "M820,5 L735,85 L425,85",
        ornamentUpperline: "M780,15 L600,15 L545,70 L475,70"
    }

    private decorationOrnamentBlocks: Record<string, string> =
    {
        ornamentFirstBlock: "M793,30 L735,85 L705,85 L763,30 L793,30",
        ornamentSeconBlock: "M743,30 L685,85 L655,85 L713,30 L743,30",
        ornamentThirdBlock: "M693,30 L635,85 L605,85 L663,30 L693,30",
        ornamentFourtBlock: "M643,30 L585,85 L555,85 L613,30 L643,30"

    }

    private decorationLayingBlocks: Record<string, string> = 
    {
        ornamentFirstLayBlock: "M400,85 L325,85 L315,75 L390,75 L400,85",
        ornamentSeconLayBlock: "M300,85 L225,85 L215,75 L290,75 L300,85",
    }

    constructor(private context: SlideshowContext) {}

    public createTopDecoration(group: SVGElement | null, id: number): void
    {
        // De 2 lijnen boven en onder de ornament aan de bovenkant vand e SVG
        this.underlineUpperline(group, id)

        // De 4 schuine blokken binnenin het ornament
        this.ornamentBlocks(id)

        // De 2 liggende blokken van het ornament
        this.layingBlocks(id)
    }

    public underlineUpperline(group: SVGElement | null, id: number): void
    {
        const newOrnamentUnderline = CalcPathPositionsInBox.calcPosition(this.context, id, this.decorationLines.ornamentUnderline)
        const newOrnamentUpperline = CalcPathPositionsInBox.calcPosition(this.context, id, this.decorationLines.ornamentUpperline)
        
        // Top underline
        new SVGFactory(group, "path", {
            d: id === 0 ? this.decorationLines.ornamentUnderline : newOrnamentUnderline,
            stroke: "rgb(51, 81, 142)",
            "stroke-width": 4,
            fill: "none"
        }).createSvgTag()

        // Top upperline
        new SVGFactory(this.context.svg.svg, "path", {
            d: newOrnamentUpperline,
            stroke: "rgb(51, 81, 142)",
            "stroke-width": 4,
            fill: "none"
        }).createSvgTag()
    }

    private ornamentBlocks(id: number): void
    {
        const newFirstBlock: string = CalcPathPositionsInBox.calcPosition(this.context, id, this.decorationOrnamentBlocks.ornamentFirstBlock)
        const newSeconBlock: string = CalcPathPositionsInBox.calcPosition(this.context, id, this.decorationOrnamentBlocks.ornamentSeconBlock)
        const newThirdBlock: string = CalcPathPositionsInBox.calcPosition(this.context, id, this.decorationOrnamentBlocks.ornamentThirdBlock)
        const newFourtBlock: string = CalcPathPositionsInBox.calcPosition(this.context, id, this.decorationOrnamentBlocks.ornamentFourtBlock)

        // Eerst schuine blok (vanaf rechts)
        new SVGFactory(this.context.svg.svg, "path", {
            d: id === 0 ? this.decorationOrnamentBlocks.ornamentFirstBlock : newFirstBlock,
            stroke: "rgb(51, 81, 142)",
            "stroke-width": 4,
            fill: "rgba(8, 63, 174, 0.2)"
        }).createSvgTag()

        // Tweede schuine blok
        new SVGFactory(this.context.svg.svg, "path", {
            d: id === 0 ? this.decorationOrnamentBlocks.ornamentSeconBlock : newSeconBlock,
            stroke: "rgb(51, 81, 142)",
            "stroke-width": 4,
            fill: "rgba(8, 63, 174, 0.2)"
        }).createSvgTag()

        // Derde schuine blok
        new SVGFactory(this.context.svg.svg, "path", {
            d: id === 0 ? this.decorationOrnamentBlocks.ornamentThirdBlock : newThirdBlock,
            stroke: "rgb(51, 81, 142)",
            "stroke-width": 4,
            fill: "rgba(8, 63, 174, 0.2)"
        }).createSvgTag()

        // Vierdde schuine blok
        new SVGFactory(this.context.svg.svg, "path", {
            d: id === 0 ? this.decorationOrnamentBlocks.ornamentFourtBlock : newFourtBlock,
            stroke: "rgb(51, 81, 142)",
            "stroke-width": 4,
            fill: "rgba(8, 63, 174, 0.2)"
        }).createSvgTag()
    }

    private layingBlocks(id: number): void
    {
        const newFirstLayBlock: string = CalcPathPositionsInBox.calcPosition(this.context, id, this.decorationLayingBlocks.ornamentFirstLayBlock)
        const newSeconLayBlock: string = CalcPathPositionsInBox.calcPosition(this.context, id, this.decorationLayingBlocks.ornamentSeconLayBlock)

        // Eerst liggen blok (vanaf rechts in box 0)
        new SVGFactory(this.context.svg.svg, "path", {
            d: id === 0 ? this.decorationLayingBlocks.ornamentFirstLayBlock : newFirstLayBlock,
            stroke: "rgb(51, 81, 142)",
            "stroke-width": 4,
            fill: "rgba(8, 63, 174, 0.2)"
        }).createSvgTag()

        new SVGFactory(this.context.svg.svg, "path", {
            d: id === 0 ? this.decorationLayingBlocks.ornamentSeconLayBlock : newSeconLayBlock,
            stroke: "rgb(51, 81, 142)",
            "stroke-width": 4,
            fill: "rgba(8, 63, 174, 0.2"
        }).createSvgTag()
    }
}