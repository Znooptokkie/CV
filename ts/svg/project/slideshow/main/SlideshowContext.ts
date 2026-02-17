import { SlideshowBox } from "./factory/SlideshowBox.js"
// import { SlideshowMainDecoration } from "./factory/SlideshowMainDecoration.js"
import { SlideshowMainDrawLines, SlideshowMainInstance } from "./factory/SlideshowMainSVG.js"

export class SlideshowContext
{
    svg: SlideshowMainInstance
    boxes: SlideshowBox[] = []
    // decorations: SlideshowMainDecoration[] = []
    lines: SlideshowMainDrawLines[] = []

    constructor(svg: SlideshowMainInstance)
    {
        this.svg = svg
    }
}