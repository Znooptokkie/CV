import { ProjectSVGInterface } from "../../../interfaces/ProjectSVGInterface"

import { CreateSVG } from "../../construct/core/SVGCreate.js"
import { SVGFactory } from "../../construct/core/SVGFactory.js"

export class CreateProjectDescriptionParagraphTitleSVG
{
    private SVGElement: CreateSVG | null = null

    private viewboxSize: string = "0 0 1200 100"
    private preserveAspectRatio: string = "xMidYMid meet"

    private paragraphTitle: SVGTextElement | null = null
    private startPoint: number | null = null

    private side: string = "left"
    // private isMobile: boolean = false

    constructor(
        private paragraphDiv: HTMLElement,
        private svgID: string
    ) {}

    public getSVGElement()
    {
        return this.SVGElement
    }

    private createSVGElement(): void
    {
        this.SVGElement = new CreateSVG(
            this.svgID,
            {
                viewBox: this.viewboxSize,
                preserveAspectRatio: this.preserveAspectRatio
            },
            true
        )
    }

    private appendSVGToDOM(): void
    {
        if (!this.SVGElement)
            return

        this.SVGElement.createRootSVG(
            this.paragraphDiv.id
        )
    }

    private getViewBoxSize()
    {
        const svgElement = document.getElementById(this.svgID)

        if (!(svgElement instanceof SVGSVGElement))
            return

        const width = svgElement.viewBox.baseVal.width
        const height = svgElement.viewBox.baseVal.height

        return {
            viewboxWidth: width,
            viewboxHeight: height
        }
    }
    
    private createGroup(
        parent: CreateSVG | SVGElement | null, 
        classSelector: string
    )
    {
        return new SVGFactory(parent, "g", {
            class: classSelector
        }).createSvgTag()
    }

    private drawPathParts(
        parent: SVGElement | null,
        pathData: ProjectSVGInterface
    )
    {
        new SVGFactory(parent, "path", {
            d: pathData["d"],
            fill: pathData["fill"],
            stroke: pathData["stroke"],
            "stroke-width": pathData["stroke-width"]
        }).createSvgTag()
    }

    private get middleHeight()
    {
        return this.getViewBoxSize()!.viewboxHeight / 2
    }

    private get middleWidth()
    {
        return this.getViewBoxSize()!.viewboxWidth / 2
    }

    private get paragraphTitleWidth()
    {
        if (!this.paragraphTitle)
            return

        return Math.floor(this.paragraphTitle.getComputedTextLength())
    } 
    
    public dynamicStartPoints(side: string)
    {
        const viewBoxWidth = this.getViewBoxSize()?.viewboxWidth
        const textWidth = this.paragraphTitleWidth
    
        const startPointLeft = (viewBoxWidth! / 2) - (textWidth! / 2) - 25
        const startPointRight = (viewBoxWidth! / 2) + (textWidth! / 2) + 25
    
        this.side = side
    
        if (side === "left")
            this.startPoint = startPointLeft
        else
            this.startPoint = startPointRight
    }

    private createGreenPart(parent: SVGElement | null)
    {
        const SVGMiddleHeight = this.middleHeight

        if (!this.startPoint)
            return

        const operator = this.side === "left" ? -1 : 1

        const data = {
            d: `M ${this.startPoint + (operator * 140)} ${SVGMiddleHeight}
                L ${this.startPoint + (operator * 90)} ${SVGMiddleHeight}
                L ${this.startPoint + (operator * 70)} ${SVGMiddleHeight - 20}
                L ${this.startPoint + (operator * 50)} ${SVGMiddleHeight}
                L ${this.startPoint + (operator * 70)} ${SVGMiddleHeight + 20}
                L ${this.startPoint + (operator * 90)} ${SVGMiddleHeight}

                M ${this.startPoint + (operator * 50)} ${SVGMiddleHeight}
                L ${this.startPoint} ${SVGMiddleHeight}
            `,
            fill: "none",
            stroke: "rgba(51, 81, 142, 1)",
            "stroke-width": "1"
        }

        this.drawPathParts(parent, data)
    }

    private createGreenInnerGlowPart(parent: SVGElement | null)
    {
        const SVGMiddleHeight = this.middleHeight

        if (!this.startPoint)
            return

        const operator = this.side === "left" ? -1 : 1

        const data = {
            d: `M ${this.startPoint + (operator * 80)} ${SVGMiddleHeight}
                L ${this.startPoint + (operator * 70)} ${SVGMiddleHeight - 10}
                L ${this.startPoint + (operator * 60)} ${SVGMiddleHeight}
                L ${this.startPoint + (operator * 70)} ${SVGMiddleHeight + 10}
                L ${this.startPoint + (operator * 80)} ${SVGMiddleHeight}
            `,
            stroke: "rgba(10, 60, 31, 1)",
            fill: "rgba(46, 204, 113, 0.75)",
            "stroke-width": "1"
        }

        this.drawPathParts(parent, data)
    }

    private createHollowPart(parent: SVGElement | null)
    {
        const SVGMiddleHeight = this.middleHeight

        if (!this.startPoint)
            return

        const operator = this.side === "left" ? -1 : 1

        const data = {
            d: `M ${this.startPoint + (operator * 290)} ${SVGMiddleHeight}
                L ${this.startPoint + (operator * 240)} ${SVGMiddleHeight}
                L ${this.startPoint + (operator * 230)} ${SVGMiddleHeight - 10}
                L ${this.startPoint + (operator * 220)} ${SVGMiddleHeight}
                L ${this.startPoint + (operator * 230)} ${SVGMiddleHeight + 10}
                L ${this.startPoint + (operator * 240)} ${SVGMiddleHeight}
            `,
            fill: "none",
            stroke: "rgba(51, 81, 142, 1)",
            "stroke-width": "1"
        }

        this.drawPathParts(parent, data)
    }

    private createFilledPart(parent: SVGElement | null)
    {
        const SVGMiddleHeight = this.middleHeight

        if (!this.startPoint)
            return

        const operator = this.side === "left" ? -1 : 1

        const data = {
            d: `M ${this.startPoint + (operator * 220)} ${SVGMiddleHeight}
                L ${this.startPoint + (operator * 170)} ${SVGMiddleHeight}
                L ${this.startPoint + (operator * 155)} ${SVGMiddleHeight - 15}
                L ${this.startPoint + (operator * 140)} ${SVGMiddleHeight}
                L ${this.startPoint + (operator * 155)} ${SVGMiddleHeight + 15}
                L ${this.startPoint + (operator * 170)} ${SVGMiddleHeight}
            `,
            fill: "rgba(51, 81, 142, 0.25)",
            stroke: "rgba(51, 81, 142, 1)",
            "stroke-width": "1"
        }

        this.drawPathParts(parent, data)
    }

    public createParagraphTitle(
        parent: SVGElement | CreateSVG | null,
        title: string
    )
    {
        this.paragraphTitle = new SVGFactory(parent, "text", {
            x: this.middleWidth,
            y: this.middleHeight,
            "text-anchor": "middle",
            "dominant-baseline": "middle",
            fill: "none",
            stroke: "rgba(51, 81, 142, 1)",
            "font-size": window.innerWidth > 768 ? "2rem" : "7rem"

        }).createSvgTag() as SVGTextElement

        if (!this.paragraphTitle)
            return
    
        this.paragraphTitle.textContent = title
    }

    public createParts(): void
    {
        const side = this.side === "left" ? "left-side" : "right-side"

        const leftSide = this.createGroup(
            this.SVGElement,
            side
        )

        const hollowDiamond = this.createGroup(
            leftSide,
            "hollow-diamond"
        )

        const filledDiamond = this.createGroup(
            leftSide,
            "filled-diamond"
        )

        const greenDiamond = this.createGroup(
            leftSide,
            "green-diamond"
        )

        if (window.innerWidth > 768)
        {
            this.createHollowPart(hollowDiamond)
            this.createFilledPart(filledDiamond)
            this.createGreenPart(greenDiamond)
            this.createGreenInnerGlowPart(greenDiamond)
        }
    }
    
    public init(): void
    {
        this.createSVGElement()
        this.appendSVGToDOM()
    }
}