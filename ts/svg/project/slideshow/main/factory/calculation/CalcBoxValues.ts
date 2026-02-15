import { BoxValues } from "../../../../../../types/slideshow.type";

import { SlideshowContext } from "../../SlideshowContext.js";


export class CalcBoxSizeValues
{
    public static calcSize(context: SlideshowContext): BoxValues
    {
        return {
            width: context.svg.viewboxWidth,
            height: context.svg.viewboxHeight,
            halfwayWidth: context.svg.viewboxWidth / 2,
            halfwayHeight: context.svg.viewboxHeight / 2
        }
    }
}