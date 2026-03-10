import { CreateSVG } from "../../../../construct/core/SVGCreate.js";
import { SVGFactory } from "../../../../construct/core/SVGFactory.js";
import { DeconstructPath } from "../../../../construct/DeconstructPath.js";
import { CreateGradient } from "../../../../construct/gradient/CreateGradient.js";
import { DrawSegments } from "../../../../construct/gradient/DrawSegments.js";
import { OffsetVector } from "../../../../construct/gradient/OffsetVector.js";

export class LanguageMainSVG
{
    public static createOuterBorder(svg: CreateSVG, path: string, innerPath: string): void
    {
        new SVGFactory(svg, "path", {
            d: path,
            stroke: "rgba(51, 81, 142, 0.25)",
            // stroke: "none",
            "stroke-width": 2,
            fill: "rgba(51, 81, 142, 0.05)"
            // fill: "none"
        }).createSvgTag()

        const defs = new SVGFactory(svg, "defs").createSvgTag();

        const OFFSET = 50;

        const outerPoints = DeconstructPath.getPathParts(path);
        const innerPoints = DeconstructPath.getPathParts(innerPath);

        for (let i = 0; i < outerPoints.length - 1; i++)
        {
            const [p0, p1] = [outerPoints[i], outerPoints[i + 1]];
            const [p0A, p1A] = [innerPoints[i], innerPoints[i + 1]];

            const offsetVector = OffsetVector.computeOffsetVector(p0, p1, OFFSET)
            const gradId = CreateGradient.createSegmentGradient(defs!, p0, offsetVector, i);
            DrawSegments.drawSegment(svg, p0, p1, p0A, p1A, gradId);
        }
    }
}