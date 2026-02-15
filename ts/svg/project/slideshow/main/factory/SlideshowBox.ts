import { SVGFactory } from "../../../../construct/core/SVGFactory.js"
import { SlideshowContext } from "../SlideshowContext.js"
import { SlideshowCornerDecoration } from "./decoration/SlideshowCornerDecoration.js"
import { SlideshowTopDecoration } from "./decoration/SlideshowTopDecoration.js"
import { SlideshowBlockNav } from "./nav/SlideshowBlockNav.js"


export class SlideshowBox
{
    public id: number
    private static boxPosition = 0

    constructor(protected context: SlideshowContext)
    {
        this.id = SlideshowBox.boxPosition
        SlideshowBox.boxPosition += 1
        context.boxes.push(this)

        this.drawBoxDecorations()
    }

    public createGroup(): SVGElement | null
    {
        const group = new SVGFactory(this.context.svg.svg, "g", {
            class: `slideshow-svg-box-decoartion-${this.id}`
        }).createSvgTag()

        return group
    }

    private drawBoxDecorations(): void
    {
        const group = this.createGroup()

        const cornersDecoration = new SlideshowCornerDecoration(this.context)
        cornersDecoration.createCornerDecoration(group, this.id)

        const topDecoration = new SlideshowTopDecoration(this.context)
        topDecoration.createTopDecoration(group, this.id)

        const navBlocks = new SlideshowBlockNav()
        navBlocks.createTopDecoration(group)
    }
}
