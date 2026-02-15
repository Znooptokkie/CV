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
            stroke: "rgb(51, 81, 142)",
            opacity: options?.opacity ?? 1,
            fill: "none",
            "stroke-width": 8
        }).createSvgTag()

        ProjectsContent.drawCircles(container)
        ProjectsContent.drawInitials(container)
    }

    private static drawCircles(container: CreateSVG | null)
    {
        const circlesData = [
            { cx: 1940, stroke: "rgba(51, 81, 142, 0.5)", fill: "none", "stroke-width": 6 },
            { cx: 2000, stroke: "rgba(51, 81, 142, 0.5)", fill: "none", "stroke-width": 6 },
            { cx: 2060, stroke: "rgba(51, 81, 142, 0.75)", fill: "none", "stroke-width": 6 },
            { cx: 2120, stroke: "none", fill: "rgba(51, 81, 142, 0.5)" },
            { cx: 2180, stroke: "none", fill: "rgb(51, 81, 142)" }
        ]

        circlesData.forEach(data => {
            new SVGFactory(container, "circle", {
                cx: data.cx,
                cy: 1060,
                r: 17,
                stroke: data.stroke,
                "stroke-width": data["stroke-width"]!,
                fill: data.fill,
                opacity: 0.5
            }).createSvgTag()
        })

    }

    private static drawInitials(container: CreateSVG | null)
    {
        const textBorder = new SVGFactory(container, "text", {
            x: 2225,
            y: 1060,
            fill: "white",
            "font-size": "38",
            "font-family": "Courier Prime",
            "dominant-baseline": "middle",
            opacity: 0.25
        }).createSvgTag()

        textBorder!.textContent = "PY.2025.003A"
    }
}