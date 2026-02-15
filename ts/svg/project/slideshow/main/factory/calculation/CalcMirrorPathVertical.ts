import { Point } from "../../../../../../types/path.properties.type"

import { DeconstructPath } from "../../../../../construct/DeconstructPath.js"
import { SlideshowContext } from "../../SlideshowContext.js"
import { CalcPathDifferenceInCoords } from "./CalcPathDifferenceInCoords.js"


export class CalcMirrorPathVertical
{
    public static mirrorPathVertical(context: SlideshowContext, pathPoints: Point[]): string
    {    
            const newXPosition = CalcPathDifferenceInCoords.calcDifference(context, pathPoints)
            
            return DeconstructPath.createNewSVGPathString(newXPosition)
        }
}