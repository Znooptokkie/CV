import { SVGPathAttributes } from "../../types/attributes";
import { CreateSVG } from "./core/SVGCreate.js";
import { SVGFactory } from "./core/SVGFactory.js";
import { PathFigures } from "./PathFigures.js";

export class InitPath
{
    public static createBorderParts(
        container: CreateSVG,
        outer: string,
        inner: string,
        category: string
    ): void | null
    {
        if (!inner || !outer) return null;

        const figures = PathFigures.createFigurePathString(inner, outer);
        if (!figures) return null;

        // === DEFS ===
        const defs = new SVGFactory(container, "defs").createSvgTag();

        // Globale schaduw filter
        const shadowFilter = new SVGFactory(defs, "filter", {
            id: "svgGlobalShadow",
            x: "-50%",
            y: "-50%",
            width: "100%",
            height: "100%",
            filterUnits: "objectBoundingBox"
        }).createSvgTag();

        new SVGFactory(shadowFilter, "feDropShadow", {
            dx: "5",
            dy: "5",
            stdDeviation: "4",
            "flood-color": "#000005",
            "flood-opacity": "0.25"
        }).createSvgTag();

        // Schaduw achter de SVG, alleen op outer path
        new SVGFactory(container, "path", {
            d: outer,
            fill: "#000020",
            "fill-opacity": "0.4",
            filter: "url(#svgGlobalShadow)"
        }).createSvgTag();

        // ROOT GROUP ZONDER FILTER
        const rootGroup = new SVGFactory(container, "g", {
            class: `${category}-root`
        }).createSvgTag();

        // INNER CONTENT
        const innerGroup = new SVGFactory(rootGroup, "g", {
            class: `${category}-inner`
        }).createSvgTag();

        const innerGradId = "innerGradient";
        const innerGrad = new SVGFactory(defs, "linearGradient", {
            id: innerGradId,
            x1: "0%",
            y1: "0%",
            x2: "100%",
            y2: "100%",
            gradientUnits: "userSpaceOnUse"
        }).createSvgTag();

        new SVGFactory(innerGrad, "stop", { offset: "0%", "stop-color": "#00010fff" }).createSvgTag();
        new SVGFactory(innerGrad, "stop", { offset: "39.9%", "stop-color": "#00010fff" }).createSvgTag();
        new SVGFactory(innerGrad, "stop", { offset: "40%", "stop-color": "#020313ff" }).createSvgTag();
        new SVGFactory(innerGrad, "stop", { offset: "69.9%", "stop-color": "#020313ff" }).createSvgTag();
        new SVGFactory(innerGrad, "stop", { offset: "70%", "stop-color": "#00010fff" }).createSvgTag();
        new SVGFactory(innerGrad, "stop", { offset: "100%", "stop-color": "#00010fff" }).createSvgTag();  

        new SVGFactory(innerGroup, "path", {
            d: inner,
            fill: `url(#${innerGradId})`,
            // fill: "none",
            stroke: "none"
        }).createSvgTag();

        // BORDER GROUP
        const borderGroup = new SVGFactory(rootGroup, "g", {
            class: `${category}-border`
        }).createSvgTag();

        // Nu verplaats je alle border/figure styling naar een aparte functie
        InitPath.createBorderGradients(defs, figures, borderGroup);
        // InitPath.createBorderParts(container, outer, inner, "language-small")
        // console.log(inner);
        // console.log(figures);
    }

    /**
     * Voorbeeldfunctie: hier staat alle huidige per-figure / border gradient logic
     * Je kunt deze helemaal overschrijven om nieuwe styling te maken
     */
    private static createBorderGradients(defs: any, figures: string[], borderGroup: any)
    {
        // Globale metallic gradient (voorbeeld)
        const globalGrad = new SVGFactory(defs, "linearGradient", {
            id: "borderGradientGlobal",
            x1: "0%",
            y1: "0%",
            x2: "100%",
            y2: "100%",
            gradientUnits: "userSpaceOnUse"
        }).createSvgTag();

        // new SVGFactory(globalGrad, "stop", { offset: "0%", "stop-color": "#e6e6e6ff" }).createSvgTag();
        // new SVGFactory(globalGrad, "stop", { offset: "40%", "stop-color": "#000217" }).createSvgTag();
        // new SVGFactory(globalGrad, "stop", { offset: "70%", "stop-color": "#000112" }).createSvgTag();
        // new SVGFactory(globalGrad, "stop", { offset: "100%", "stop-color": "#000010" }).createSvgTag();

        // Per-figure gradient (voorbeeld)
        figures.forEach((figure, idx) =>
        {
            const gradId = `figureGradient${idx}`;
            const grad = new SVGFactory(defs, "linearGradient", {
                id: gradId,
                gradientUnits: "objectBoundingBox",
                x1: "1", y1: "0",
                x2: "1", y2: "1"
            }).createSvgTag();

            new SVGFactory(grad, "stop", { offset: "0%", "stop-color": "#020318ff" }).createSvgTag();
            new SVGFactory(grad, "stop", { offset: "50%", "stop-color": "#02030eff" }).createSvgTag();
            new SVGFactory(grad, "stop", { offset: "100%", "stop-color": "#00010fff" }).createSvgTag();

            new SVGFactory(borderGroup, "path", {
                d: `${figure}Z`,
                fill: `url(#${gradId})`,
                stroke: "rgba(51, 81, 142, 0.25)"
            }).createSvgTag();

            // console.log(figure);
        });
    }
}
