import { SVGFactory } from "../../../../../construct/core/SVGFactory.js";
import { SlideshowContext } from "../../SlideshowContext.js";
import { CalcPathPositionsInBox } from "../calculation/CalcPathPositionInBox.js";


export class SlideshowTopDecoration
{
    private decorationLines: Record<string, string> = 
    {
        ornamentUnderline: "M730,5 L645,85 L335,85",
        ornamentUpperline: "M690,15 L510,15 L455,70 L385,70"
    }

    private decorationOrnamentBlocks: Record<string, string> =
    {
        ornamentFirstBlock: "M703,30 L645,85 L615,85 L673,30 L703,30",
        ornamentSeconBlock: "M653,30 L595,85 L565,85 L623,30 L653,30",
        ornamentThirdBlock: "M603,30 L545,85 L515,85 L573,30 L603,30",
        ornamentFourtBlock: "M553,30 L495,85 L465,85 L523,30 L553,30"
    }

    private decorationLayingBlocks: Record<string, string> = 
    {
        ornamentFirstLayBlock: "M310,85 L235,85 L225,75 L300,75 L310,85",
        ornamentSeconLayBlock: "M210,85 L135,85 L125,75 L200,75 L210,85",
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
            "stroke-width": 3,
            fill: "none"
        }).createSvgTag()

        // Top upperline
        new SVGFactory(this.context.svg.svg, "path", {
            d: newOrnamentUpperline,
            stroke: "rgb(51, 81, 142)",
            "stroke-width": 3,
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
            "stroke-width": 3,
            fill: "rgba(8, 63, 174, 0.1)"
        }).createSvgTag()

        // Tweede schuine blok
        new SVGFactory(this.context.svg.svg, "path", {
            d: id === 0 ? this.decorationOrnamentBlocks.ornamentSeconBlock : newSeconBlock,
            stroke: "rgb(51, 81, 142)",
            "stroke-width": 3,
            fill: "rgba(8, 63, 174, 0.1)"
        }).createSvgTag()

        // Derde schuine blok
        new SVGFactory(this.context.svg.svg, "path", {
            d: id === 0 ? this.decorationOrnamentBlocks.ornamentThirdBlock : newThirdBlock,
            stroke: "rgb(51, 81, 142)",
            "stroke-width": 3,
            fill: "rgba(8, 63, 174, 0.1)"
        }).createSvgTag()

        // Vierdde schuine blok
        new SVGFactory(this.context.svg.svg, "path", {
            d: id === 0 ? this.decorationOrnamentBlocks.ornamentFourtBlock : newFourtBlock,
            stroke: "rgb(51, 81, 142)",
            "stroke-width": 3,
            fill: "rgba(8, 63, 174, 0.1)"
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
            "stroke-width": 3,
            fill: "rgba(8, 63, 174, 0.1)"
        }).createSvgTag()

        new SVGFactory(this.context.svg.svg, "path", {
            d: id === 0 ? this.decorationLayingBlocks.ornamentSeconLayBlock : newSeconLayBlock,
            stroke: "rgb(51, 81, 142)",
            "stroke-width": 3,
            fill: "rgba(8, 63, 174, 0.2"
        }).createSvgTag()
    }
}