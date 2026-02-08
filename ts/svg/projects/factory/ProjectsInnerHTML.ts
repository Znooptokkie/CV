import { CreateSVG } from "../../construct/core/SVGCreate.js"
import { SVGFactory } from "../../construct/core/SVGFactory.js"
import { DeconstructPath } from "../../construct/DeconstructPath.js"
import { CreateGradient } from "../../construct/gradient/CreateGradient.js"
import { DrawSegments } from "../../construct/gradient/DrawSegments.js"
import { OffsetVector } from "../../construct/gradient/OffsetVector.js"

export class ProjectsInnerHTMLContent
{
    public static createWrapper(projectTitle: string, projectText: string)
    {
        const wrapper = document.createElement("div")
        wrapper.setAttribute("xmlns", "http://www.w3.org/1999/xhtml")
        wrapper.style.cssText = `
            width:100%;
            height:100%;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            gap:10px;
        `
    
        const title = document.createElement("h2")
        title.style.fontSize = "100px"
        title.style.fontStyle = "italic"
        title.style.fontFamily = "Goldman", "sans-serif"
        // title.style.color = "rgb(51, 81, 142)"
        title.style.color = "rgba(8, 63, 174, 1)"
        title.style.textShadow = "24px 24px 0 rgba(6, 10, 18, 1)";
        title.textContent = projectTitle

        const content = document.createElement("p")
        content.style.fontSize = "54px"
        content.style.lineHeight = "2.5"
        // content.style.color = "rgb(51, 81, 142)"
        content.style.color = "rgba(8, 63, 174, 1)"
        content.style.textAlign = "center"
        content.style.textShadow = "15px 15px 0 rgba(6, 10, 18, 1)";
        content.textContent = projectText

        wrapper.append(title)
        wrapper.append(content)
        return wrapper
    } 

    public static createInnerPath(container: CreateSVG | null, path?: string, innerPath?: string): SVGPathElement | null
    {
        if (!container) 
            return null;

        const pathElement = new SVGFactory(container, "path", {
            d: path!,
            // stroke: "rgba(51, 81, 142, 0.55)",
            stroke: "rgba(8, 63, 174, 0.5)",
            // fill: "rgba(10, 20, 35, 0.5)",
            fill: "rgba(8, 63, 174, 0.05)"
        }).createSvgTag()

        // Voeg glow toe op basis van dit path
        ProjectsInnerHTMLContent.createShadow(container, path!, innerPath!)

        return pathElement as SVGPathElement
    }

    public static initContent(container: CreateSVG | null, pathElement: SVGPathElement | null, projectTitle: string, projectText: string)
    {
        if (!container || !pathElement) 
            return null

        const foreign = new SVGFactory(container, "foreignObject", {
            x: 1750,
            y: 100,
            width: 1500,
            height: 775
        }).createSvgTag()

        const wrapper = ProjectsInnerHTMLContent.createWrapper(projectTitle, projectText)
        foreign?.appendChild(wrapper)
    }

    public static createShadow(container: CreateSVG | null, outerPath: string, innerPath: string)
    {
        if (!container) return;

        const defs = new SVGFactory(container, "defs").createSvgTag();

        const OFFSET = 100;

        const outerPoints = DeconstructPath.getPathParts(outerPath);
        const innerPoints = DeconstructPath.getPathParts(innerPath);

        for (let i = 0; i < outerPoints.length - 1; i++)
        {
            const [p0, p1] = [outerPoints[i], outerPoints[i + 1]];
            const [p0A, p1A] = [innerPoints[i], innerPoints[i + 1]];

            const offsetVector = OffsetVector.computeOffsetVector(p0, p1, OFFSET)
            const gradId = CreateGradient.createSegmentGradient(defs!, p0, offsetVector, i);
            DrawSegments.drawSegment(container, p0, p1, p0A, p1A, gradId);
        }
    }
}