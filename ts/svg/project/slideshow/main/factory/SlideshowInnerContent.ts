import { SVGFactory } from "../../../../construct/core/SVGFactory.js";
import { DeconstructPath } from "../../../../construct/DeconstructPath.js";
import { CreateGradient } from "../../../../construct/gradient/CreateGradient.js";
import { DrawSegments } from "../../../../construct/gradient/DrawSegments.js";
import { OffsetVector } from "../../../../construct/gradient/OffsetVector.js";
import { SlideshowContext } from "../SlideshowContext.js";
import { SlideshowState } from "../../nav/SlideshowState.js";
import { SlideshowMainFunctionality } from "../../nav/main/SlideshowMainFunctionality.js";

/**
 * Tekent de inner border, masked image en gradients van een slideshow
 */
export class SlideshowInnerContent 
{
private innerPath = "M30,120 L1790,120 L1790,165 L1770,180 L1770,260 L1760,270 L1760,1200 L1750,1210 L1750,1280 L70,1280 L70,1220 L60,1210 L60,270 L50,260 L50,180 L30,165 L30,120";

private innerInnerPath = "M70,160 L1730,160 L1730,160 L1710,160 L1710,200 L1700,210 L1700,1150 L1690,1150 L1690,1220 L130,1220 L130,1160 L120,1150 L120,210 L110,200 L110,160 L90,160 L70,160";

    private imageElement: SVGImageElement | null = null;

    constructor(private context: SlideshowContext) {}

    public async drawInnerContentBorder(projectName: string, slideshow: SlideshowMainFunctionality, state: SlideshowState) 
    {
        this.addInnerMaskToDefs(projectName);
        await this.addMaskedImage(projectName, slideshow, state);

        const { svg } = this.context;
        new SVGFactory(svg.svg, "path", {
            d: this.innerPath,
            stroke: "rgb(51, 81, 142)",
            fill: "rgba(0,0,0,0.5)",
            "stroke-width": 2
        }).createSvgTag();
    }

    private addInnerMaskToDefs(projectName: string) 
    {
        const { svg } = this.context;
        
        const defs = new SVGFactory(svg.svg, "defs", {}).createSvgTag();
        const mask = new SVGFactory(defs, "mask", { 
            id: `inner-mask-${projectName}`, 
            maskUnits: "userSpaceOnUse" 
        }).createSvgTag();

        new SVGFactory(mask, "rect", {
            x: 0,
            y: 0,
            width: this.context.svg.viewboxWidth,
            height: this.context.svg.viewboxHeight,
            fill: "black"
        }).createSvgTag();

        new SVGFactory(mask, "path", { 
            d: this.innerPath, 
            fill: "white" 
        }).createSvgTag();

        const OFFSET = 75;
        const innerPoints = DeconstructPath.getPathParts(this.innerInnerPath);
        const outerPoints = DeconstructPath.getPathParts(this.innerPath);

        for (let i = 0; i < Math.min(outerPoints.length - 1, innerPoints.length - 1); i++) 
        {
            const [p0, p1] = [outerPoints[i], outerPoints[i + 1]];
            const [p0A, p1A] = [innerPoints[i], innerPoints[i + 1]];

            const offsetVector = OffsetVector.computeOffsetVector(p0, p1, OFFSET);
            const gradId = CreateGradient.createSegmentGradient(defs!, p0, offsetVector, i);
            DrawSegments.drawSegment(svg.svg, p0, p1, p0A, p1A, gradId);
        }
    }

    private async addMaskedImage(projectName: string, slideshow: SlideshowMainFunctionality, state: SlideshowState) 
    {
        const { svg } = this.context;
        const imageURL = state.getCurrent()?.image_url;

        this.imageElement = new SVGFactory(svg.svg, "image", {
            href: `/static/images/${imageURL}`,
            x: 0,
            y: 0,
            width: this.context.svg.viewboxWidth,
            height: this.context.svg.viewboxHeight,
            mask: `url(#inner-mask-${projectName})`,
            preserveAspectRatio: "xMidYMid slice",
            "pointer-events": "none"
        }).createSvgTag() as SVGImageElement;

        slideshow.setImageElement(this.imageElement);
        slideshow.bindNavigation();
    }
}