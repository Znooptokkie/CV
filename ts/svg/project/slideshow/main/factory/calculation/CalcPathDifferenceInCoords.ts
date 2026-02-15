import { Point } from "../../../../../../types/path.properties.type"

import { SlideshowContext } from "../../SlideshowContext.js"
import { CalcBoxSizeValues } from "./CalcBoxValues.js"


export class CalcPathDifferenceInCoords
{
    public static calcDifference(context: SlideshowContext, pathPoints: Point[]): Point[]
    {
        const newPosition = pathPoints.map(p => ({
            x: CalcBoxSizeValues.calcSize(context).width - p.x,
            y: p.y
        }))

        return newPosition
    }
}