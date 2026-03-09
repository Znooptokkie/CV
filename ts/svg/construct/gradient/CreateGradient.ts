import { SVGFactory } from "../core/SVGFactory.js";

export class CreateGradient
{
    // Maak linear gradient voor segment
    public static createSegmentGradient(
        defs: SVGElement, 
        firstPoint: {x:number, y:number}, 
        offset: {x:number, y:number}, 
        index: number
    )
    {
        const gradId = `innerGlowGrad_${index}`;
        const grad = new SVGFactory(defs, "linearGradient", {
            id: gradId,
            x1: firstPoint.x.toString(),
            y1: firstPoint.y.toString(),
            x2: (firstPoint.x + offset.x).toString(),
            y2: (firstPoint.y + offset.y).toString(),
            gradientUnits: "userSpaceOnUse"
        }).createSvgTag();
    
        new SVGFactory(grad, "stop", 
            { 
                offset: "0%", 
                // "stop-color": "rgba(0, 22, 65, 0.2)"
                "stop-color": "rgba(51, 81, 142, 0.25)" 
            }).createSvgTag();
        new SVGFactory(grad, "stop", { offset: "60%", "stop-color": "rgba(10,20,35,0)" }).createSvgTag();
        
        return gradId;
    }
}