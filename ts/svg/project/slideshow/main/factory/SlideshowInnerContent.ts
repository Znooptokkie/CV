import { SVGFactory } from "../../../../construct/core/SVGFactory.js"
import { DeconstructPath } from "../../../../construct/DeconstructPath.js"
import { CreateGradient } from "../../../../construct/gradient/CreateGradient.js"
import { DrawSegments } from "../../../../construct/gradient/DrawSegments.js"
import { OffsetVector } from "../../../../construct/gradient/OffsetVector.js"
import { SlideshowContext } from "../SlideshowContext.js"
import { SlideshowFunctionality } from "./nav/SlideshowBlockNav.js"


export class SlideshowInnerContent
{
    private innerPath: string = "M120,120 L1880,120 L1880,165 L1860,180 L1860,260 L1850,270 L1850,1200 L1840,1210 L1840,1280 L160,1280 L160,1220 L150,1210 L150,270 L140,260 L140,180 L120,165 L120,120"
    private innerInnerPAth: string = "M160,160 L1820,160 L1820,160 L1800,160 L1800,200 L1790,210 L1790,1150 L1780,1150 L1780,1220 L220,1220 L220,1160 L210,1150 L210,210 L200,200 L200,160 L180,160 L160,160"
    private imageElement: SVGImageElement | null = null

    constructor(private context: SlideshowContext) {}

    public async drawInnerContentBorder(projectName: string): Promise<void>
    {
        // FIX: moet niet hier komen, maar in de init code
        //      Zorg wel dat hij eerder geladen wrodt dan de image
        this.addInnerMaskToDefs(projectName)
        await this.addMaskedImage(projectName)

        const { svg } = this.context

        new SVGFactory(svg.svg, "path", {
            d: this.innerPath,
            stroke: "rgb(51, 81, 142)",
            fill: "rgba(0,0,0,0.5)",
            "stroke-width": 4
        }).createSvgTag()

        
    }

    public addInnerMaskToDefs(projectName: string)
    {
        const { svg } = this.context
    
        const defs = new SVGFactory(svg.svg, "defs", {}).createSvgTag()
    
        const mask = new SVGFactory(defs, "mask", {
            id: `inner-mask-${projectName}`,
            maskUnits: "userSpaceOnUse"
        }).createSvgTag()
    
        new SVGFactory(mask, "rect", {
            x: 0,
            y: 0,
            width: this.context.svg.viewboxWidth,
            height: this.context.svg.viewboxHeight,
            fill: "black"
        }).createSvgTag()
    
        new SVGFactory(mask, "path", {
            d: this.innerPath,
            fill: "white"
        }).createSvgTag()

        // SHADOWEA#@$^%#$%#@!$WER

        const OFFSET = 75
        // console.log(this.innerPath);
        // console.log(this.innerInnerPAth);
        const innerInnerPoints = DeconstructPath.getPathParts(this.innerInnerPAth)
        // console.log(innerInnerPoints);
        const outerInnerPoints = DeconstructPath.getPathParts(this.innerPath)
        // console.log(outerInnerPoints);
        for (let i = 0; i < outerInnerPoints.length - 1 && i < innerInnerPoints.length - 1; i++)
        {
            const [p0, p1] = [outerInnerPoints[i], outerInnerPoints[i + 1]];
            const [p0A, p1A] = [innerInnerPoints[i], innerInnerPoints[i + 1]];

            const offsetVector = OffsetVector.computeOffsetVector(p0, p1, OFFSET)
            const gradId = CreateGradient.createSegmentGradient(defs!, p0, offsetVector, i);
            DrawSegments.drawSegment(svg.svg, p0, p1, p0A, p1A, gradId);
        }
    }
    
    
    public async addMaskedImage(projectName: string)
    {
        const { svg } = this.context

        const navFunctionality = new SlideshowFunctionality(projectName, null)

        await navFunctionality.getImages()
        navFunctionality.recordWhichImages()

        const imageURL = navFunctionality.getCurrentImage()?.image_url

        this.imageElement = new SVGFactory(svg.svg, "image", {
            href: `../static/images/${imageURL}`,
            x: 0,
            y: 0,
            width: this.context.svg.viewboxWidth,
            height: this.context.svg.viewboxHeight,
            mask: `url(#inner-mask-${projectName})`,
            preserveAspectRatio: "xMidYMid slice",
            // opacity: "0.5",
            "pointer-events": "none"
        }).createSvgTag() as SVGImageElement

        navFunctionality.setImageElement(this.imageElement)
        navFunctionality.manipulateDOM()
    }
}