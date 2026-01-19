import { CreateSVG } from "../../construct/core/SVGCreate.js"
import { SVGFactory } from "../../construct/core/SVGFactory.js"

export class ProjectsContent
{
    public static drawBorder(
        container: CreateSVG | null, 
        path: string, 
        options?: Record<string, number | string>
    )
    {
        const projectSecondSection = new SVGFactory(container, "path", {
            d: path,
            stroke: "rgba(10, 37, 92, 1)",
            opacity: options?.opacity ?? 1,
            fill: "none",
            "stroke-width": 2
        }).createSvgTag()

        ProjectsContent.drawCircles(container)
        ProjectsContent.drawInitials(container)
    }

    private static drawCircles(container: CreateSVG | null)
    {
        const circlesData = [
            { cx: 1910, stroke: "rgba(10, 37, 92, 1)", fill: "none" },
            { cx: 1970, stroke: "rgba(10, 37, 92, 1)", fill: "none" },
            { cx: 2030, stroke: "rgba(10, 37, 92, 1)", fill: "none" },
            { cx: 2090, stroke: "none", fill: "rgba(10, 37, 92, 1)" },
            { cx: 2150, stroke: "none", fill: "rgba(10, 37, 92, 1)" }
        ]

        circlesData.forEach(data => {
            new SVGFactory(container, "circle", {
                cx: data.cx,
                cy: 1025,
                r: 17,
                stroke: data.stroke,
                fill: data.fill,
                opacity: 0.5
            }).createSvgTag()
        })

    }

    private static drawInitials(container: CreateSVG | null)
    {
        const textBorder = new SVGFactory(container, "text", {
            x: 2200,
            y: 1025,
            fill: "white",
            "font-size": "38",
            "font-family": "Courier Prime",
            "dominant-baseline": "middle",
            opacity: 0.25
        }).createSvgTag()

        textBorder!.textContent = "PY.2025.003A"
    }

    public static drawArrows(container: CreateSVG | null, count = 0) // Wordt veranderd
    {
        if (!container) 
            return null

        const arrowWidth = 15
        const arrowHeight = 10
        const spacing = 2
        const startX = 2500
        const startY = 1025

        for (let i = 0; i < count; i++)
        {   
            const x = startX + i * (arrowWidth + spacing)
            
            const points = `0,0 ${arrowWidth},${arrowHeight/2} 0,${arrowHeight}`;
            const polygon = new SVGFactory(container, "polygon", {
                points: points,
                fill: "rgba(10, 37, 92, 1)",
                transform: `translate(${x},${startY})`
            }).createSvgTag()
        }
    }
}