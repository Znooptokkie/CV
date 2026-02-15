import { SlideshowBox } from "./main/factory/SlideshowBox.js"
import { SlideshowInnerContent } from "./main/factory/SlideshowInnerContent.js"
import { SlideshowMainDecoration } from "./main/factory/SlideshowMainDecoration.js"
import { SlideshowMainDrawLines, SlideshowMainInstance } from "./main/factory/SlideshowMainSVG.js"
import { SlideshowContext } from "./main/SlideshowContext.js"

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

    new SlideshowBox(context)
    new SlideshowBox(context)

    const innerContainer = new SlideshowInnerContent(context)
    innerContainer.drawInnerContentBorder()
}