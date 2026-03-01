import { SVGFactory } from "../../../../../construct/core/SVGFactory.js"
import { SlideshowContext } from "../../SlideshowContext.js"
import { CalcPathPositionsInBox } from "../calculation/CalcPathPositionInBox.js"


export class SlideshowCornerDecoration
{
    private cornerOrnamentPaths: Record<string, string> = 
    {
        LeftTopCorner: "M10,170 L30,190 L30,270 L10,250",
        leftBottomCorner: "M35,1205 L55,1225 L55,1300 L35,1300"
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
            fill: "rgba(51, 81, 142, 0.15)",
            "stroke-width": 3
        }).createSvgTag()

        new SVGFactory(group, "path", {
            d: id === 0 ? this.cornerOrnamentPaths.leftBottomCorner : newLeftBottomCorner,
            stroke: "rgba(51, 81, 142, 1)",
            fill: "rgba(51, 81, 142, 0.15)",
            "stroke-width": 3
        }).createSvgTag()
    }
}