import { CreateSVG } from "../../construct/core/SVGCreate.js"
import { SVGFactory } from "../../construct/core/SVGFactory.js"

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
        title.style.color = "rgb(51, 81, 142)"
        title.style.textShadow = "24px 24px 0 rgba(6, 10, 18, 1)";
        title.textContent = projectTitle

        const content = document.createElement("p")
        content.style.fontSize = "54px"
        content.style.lineHeight = "2.5"
        content.style.color = "rgb(51, 81, 142)"
        content.style.textAlign = "center"
        content.style.textShadow = "15px 15px 0 rgba(6, 10, 18, 1)";
        content.textContent = projectText

        wrapper.append(title)
        wrapper.append(content)
        return wrapper
    } 

    public static createLanguagePaths(container: CreateSVG | null, path?: string): SVGPathElement | null
    {
        if (!container) 
            return null;

        const pathElement = new SVGFactory(container, "path", {
            d: path!,
            stroke: "rgba(51, 81, 142, 0.55)",
            fill: "rgba(10, 20, 35, 0.25)",
        }).createSvgTag() as SVGPathElement

        return pathElement
    }

    public static initContent(container: CreateSVG | null, pathElement: SVGPathElement | null, projectTitle: string, projectText: string)
    {
        if (!container|| !pathElement) 
            return null

        const bbox = pathElement.getBBox()
        const offsetX = bbox.x + bbox.width / 2;
        const offsetY = bbox.y + bbox.height / 2;
        
        const foreign = new SVGFactory(container, "foreignObject", {
            x: 1750,
            y: 100,
            width: 1500,
            height: 775
        }).createSvgTag()

        const wrapper = ProjectsInnerHTMLContent.createWrapper(projectTitle, projectText)
        foreign?.appendChild(wrapper)
    }
}