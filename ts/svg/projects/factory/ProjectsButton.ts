import { CreateSVG } from "../../construct/core/SVGCreate.js"
import { SVGFactory } from "../../construct/core/SVGFactory.js"

export class ProjectsButton
{
    private static startContainer: number = 3050

    public static linkInstance(container: CreateSVG | null, projectName: string)
    {
        if (!container)
            return

        const link = new SVGFactory(container, "a", {
            href: `http://127.0.0.1:8000/projecten/${projectName.toLowerCase()}`,
            class: "projects-button-link"
        }).createSvgTag()

        if (!link)
            return

        const group = new SVGFactory(link, "g", {
            class: "projects-button-group"
        }).createSvgTag()

        const paths = [
            "M3140,925 L3430,925 L3340,1060 L3050,1060 Z",
            "M3460,925 L3500,925 L3410,1060 L3370,1060 Z",
            "M3530,925 L3570,925 L3480,1060 L3440,1060 Z",
            "M3570,970 L3570,1060 L3510,1060 Z"
        ]

        paths.forEach((d, i) =>
        {
            new SVGFactory(group, "path", {
                d,
                class: `projects-button-path part-${i}`,
                stroke: "rgba(51, 81, 142, 1)",
                "stroke-width": 3,
                fill: "none"
            }).createSvgTag()
        })

        const foreign = new SVGFactory(link, "foreignObject", {
            x: this.startContainer,
            y: 925,
            width: 520,
            height: 135
        }).createSvgTag()

        const wrapper = document.createElement("div")
        wrapper.setAttribute("xmlns", "http://www.w3.org/1999/xhtml")
        wrapper.style.cssText = `
            width:100%;
            height:100%;
            display:flex;
            align-items:center;
            justify-content:flex-start;
            padding-left:140px;
            pointer-events:none;
        `

        const text = document.createElement("p")
        text.textContent = "GO"
        text.style.cssText = `
            margin:0;
            font-size:74px;
            color:rgba(51, 81, 142, 1);
            font-weight:bold;
            font-family:"Ubuntu", sans-serif;
        `

        wrapper.appendChild(text)
        foreign?.appendChild(wrapper)

        link.addEventListener("mouseenter", () =>
        {
            link.querySelectorAll(".projects-button-path").forEach(p => p.setAttribute("stroke", "#2ecc71"))
        })

        link.addEventListener("mouseleave", () =>
        {
            link.querySelectorAll(".projects-button-path").forEach(p => p.setAttribute("stroke", "rgba(51, 81, 142, 1)"))
        })
    }
}
