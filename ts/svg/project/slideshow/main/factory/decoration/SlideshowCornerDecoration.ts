import { SVGFactory } from "../../../../../construct/core/SVGFactory.js"
import { SlideshowContext } from "../../SlideshowContext.js"
import { CalcPathPositionsInBox } from "../calculation/CalcPathPositionInBox.js"


export class SlideshowCornerDecoration
{
    private cornerOrnamentPaths: Record<string, string> = 
    {
        LeftTopCorner: "M100,170 L120,190 L120,270 L100,250",
        leftBottomCorner: "M125,1205 L145,1225 L145,1300 L125,1300"
    } 

    constructor(private context: SlideshowContext) {}

    public createCornerDecoration(
        group: SVGElement | null,
        id: number
    )
    {
        const newLeftTopCorner = CalcPathPositionsInBox.calcPosition(this.context, id, this.cornerOrnamentPaths.LeftTopCorner)
        const newLeftBottomCorner = CalcPathPositionsInBox.calcPosition(this.context, id, this.cornerOrnamentPaths.leftBottomCorner)

        new SVGFactory(group, "path", {
            d: id === 0 ? this.cornerOrnamentPaths.LeftTopCorner : newLeftTopCorner,
            stroke: "rgba(51, 81, 142, 1)",
            fill: "rgba(51, 81, 142, 0.25)",
            "stroke-width": 6
        }).createSvgTag()

        new SVGFactory(group, "path", {
            d: id === 0 ? this.cornerOrnamentPaths.leftBottomCorner : newLeftBottomCorner,
            stroke: "rgba(51, 81, 142, 1)",
            fill: "rgba(51, 81, 142, 0.25)",
            "stroke-width": 6
        }).createSvgTag()
    }
}