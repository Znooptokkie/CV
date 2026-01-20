import { CreateSVG } from "../../construct/core/SVGCreate.js"
import { SVGFactory } from "../../construct/core/SVGFactory.js"

export class ProjectsButton 
{
    private static startContainer: number = 3050

    public static createWrapper(projectName: string) 
    {
        const wrapper = document.createElement("a")
        wrapper.setAttribute("xmlns", "http://www.w3.org/1999/xhtml")
        wrapper.className = "projects-button-link"
        wrapper.style.cssText = `
            width:100%;
            height:100%;
            display:flex;
            align-items:center;
            justify-content:center;
            text-decoration: none;
        `
        // wrapper.href = `http://127.0.0.1:5000/projecten/${projectName.toLowerCase()}`

        const text = document.createElement("p")
        text.textContent = "GO"
        text.style.cssText = `
            margin:0;
            font-size:64px;
            color: rgba(10, 37, 92, 1);
        `

        wrapper.append(text)

        return wrapper
    }

    public static linkInstance(container: CreateSVG | null, projectName: string) 
    {
        const foreign = new SVGFactory(container, "foreignObject", {
            x: this.startContainer,
            y: 925,
            width: 520,
            height: 135
        }).createSvgTag()

        ProjectsButton.createButtonPath(container)

        const wrapper = ProjectsButton.createWrapper(projectName)
        foreign?.appendChild(wrapper)


        // HOVER EFFECT!!@$^#$@ --- Moet eigen file rkijge => events/
        const pathEl = container?.getSVGElementRoot?.querySelector(".projects-button-path")

        wrapper.addEventListener("mouseenter", () => {
            pathEl?.setAttribute("stroke", "red")
        })

        wrapper.addEventListener("mouseleave", () => {
            pathEl?.setAttribute("stroke", "rgba(10, 37, 92, 1)")
        })

    }

    public static createButtonPath(container: CreateSVG | null) 
    {
        const path = `M3140,925 L3570,925 L3570,1060 L${this.startContainer},1060 Z`
        new SVGFactory(container, "path", {
            d: path,
            stroke: "rgba(10, 37, 92, 1)",
            "stroke-width": 2,
            fill: "none",
            class: "projects-button-path"
        }).createSvgTag()

    }
}