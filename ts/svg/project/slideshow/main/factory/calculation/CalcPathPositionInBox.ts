import { Point } from "../../../../../../types/path.properties.type"

import { DeconstructPath } from "../../../../../construct/DeconstructPath.js"
import { SlideshowContext } from "../../SlideshowContext.js"
import { CalcMirrorPathVertical } from "./CalcMirrorPathVertical.js"


export class CalcPathPositionsInBox
{
    public static calcPosition(context: SlideshowContext, id: number, path: string): string
    {
        const listPathPoints: Point[] = DeconstructPath.getPathParts(path)

        if (id === 1)
            return CalcMirrorPathVertical.mirrorPathVertical(context, listPathPoints)!

        return path
    }
}