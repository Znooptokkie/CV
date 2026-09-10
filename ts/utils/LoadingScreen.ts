import { CreateSVG } from "../svg/construct/core/SVGCreate.js";
import { SVGFactory } from "../svg/construct/core/SVGFactory.js";
import { SVGCircleAttributes } from "../types/attributes.js";

export class LoadingScreen
{
    private SVGElement: CreateSVG | null = null
    private viewboxSize: string = "0 0 400 400"
    private preserveAspectRatio: string = "xMidYMid meet"

    private circles: Element[] = []
    private activeIndex: number = 0
    private cycleInterval: number | null = null

    constructor(
        private svgID: string
    ) {}

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

        this.SVGElement.createRootSVG("page-loader-content")
    }

    private createLoadingCircle()
    {
        const circleCount = 16
        const radius = 180
        const circumference = 2 * Math.PI * radius
        const segmentLength = circumference / circleCount
        const visibleLength = segmentLength * 0.6

        for (let i = 0; i < circleCount; i++)
        {
            const factory = new SVGFactory<SVGCircleAttributes>(this.SVGElement,
                "circle",
                {
                    class: "inactive-loading-circle",
                    cx: 200,
                    cy: 200,
                    r: radius,
                    "stroke-width": 20,
                    fill: "none",
                    "stroke-dasharray": `${visibleLength} ${circumference - visibleLength}`,
                    "stroke-dashoffset": -segmentLength * i
                }
            )
            const el = factory.createSvgTag()
            this.circles.push(el as Element)
        }
    }

    private assignColors(): void
    {
        this.circles.forEach((circle, i) => {
            circle.classList.remove(
                "active-loading-circle",
                "second-loading-circle",
                "third-loading-circle",
                "fourth-loading-circle",
                "inactive-loading-circle"
            )

            if (i === this.activeIndex) 
                circle.classList.add("active-loading-circle")
            else if (i === (this.activeIndex + 1) % this.circles.length)
                circle.classList.add("second-loading-circle")
            else if (i === (this.activeIndex + 2) % this.circles.length)
                circle.classList.add("third-loading-circle")
            else if (i === (this.activeIndex + 3) % this.circles.length)
                circle.classList.add("fourth-loading-circle")
            else
                circle.classList.add("inactive-loading-circle")
        })

        this.activeIndex = (this.activeIndex + 1) % this.circles.length
    }

    private startColorCycle(): void
    {
        this.assignColors()

        this.cycleInterval = window.setInterval(() => {
            this.assignColors()
        }, 100)
    }

    public init()
    {
        // Do not show the scrollbar when loading screen is active
        document.documentElement.classList.add("is-loading")

        this.createSVGElement()
        this.appendSVGToDOM()
        this.createLoadingCircle()
        this.startColorCycle()
    }

    public finish(): void
    {
        if (this.cycleInterval !== null)
            window.clearInterval(this.cycleInterval)
    
        document.documentElement.classList.remove("is-loading")
        document.getElementById("page-loader")?.classList.add("loaded")
    }
}