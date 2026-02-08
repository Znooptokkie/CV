import { CreateSVG } from "../core/SVGCreate.js";
import { SVGFactory } from "../core/SVGFactory.js";

export class DrawSegments
{
    // Teken segment tussen outer en inner points
    public static drawSegment(container: CreateSVG, firstPoint:{x:number,y:number}, secondPoint:{x:number,y:number}, firstPointNextP:{x:number,y:number}, secondPointNextP:{x:number,y:number}, gradId: string)
    {
        const segmentPath =
            `M ${firstPoint.x},${firstPoint.y} 
             L ${secondPoint.x},${secondPoint.y} 
             L ${secondPointNextP.x},${secondPointNextP.y} 
             L ${firstPointNextP.x},${firstPointNextP.y} Z`;
    
        new SVGFactory(container, "path", {
            d: segmentPath,
            fill: `url(#${gradId})`,
            pointerEvents: "none"
        }).createSvgTag();
    }
}