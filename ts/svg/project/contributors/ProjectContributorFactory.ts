import { ProjectContributorType, ProjectType } from "../../../types/projects.type";


export class ProjectContributorFactory
{
    constructor(
        private HTMLID: string,
        private projectContributor: ProjectType
    ) {}

    public createEachSpecification(): void
    {
        if (!this.HTMLID) return

        const htmlContainer = document.getElementById(this.HTMLID)
        if (!htmlContainer) return

        for (const contributor of this.projectContributor.contributors)
        {
            const contributorSVG = new ProjectContributorSVG(contributor)
            htmlContainer.appendChild(contributorSVG.init())
        }
    }
}


export class ProjectContributorSVG
{
    private svg!: SVGSVGElement

    constructor(private contributor: ProjectContributorType) {}

    public init(): SVGSVGElement
    {
        this.createSVG()
        this.createHexagonImage()
        this.createName()
        return this.svg
    }

    private createSVG(): void
    {
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        this.svg.setAttribute("viewBox", "0 0 400 600")
        this.svg.classList.add("contributor-svg")
    }

    private createHexagonImage(): void
    {
        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs")

        // Clip-path voor hexagon
        const clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath")
        clipPath.setAttribute("id", `hex-${this.contributor.name.replace(/\s/g,"")}`)
        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
        polygon.setAttribute("points", "200,50 330,125 330,275 200,350 70,275 70,125")
        clipPath.appendChild(polygon)
        defs.appendChild(clipPath)

        // Linear gradient voor border
        const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient")
        gradient.setAttribute("id", `hex-border-gradient-${this.contributor.name.replace(/\s/g,"")}`)
        gradient.setAttribute("x1", "70")
        gradient.setAttribute("y1", "200")
        gradient.setAttribute("x2", "330")
        gradient.setAttribute("y2", "200")
        gradient.setAttribute("gradientUnits", "userSpaceOnUse")

        const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
        stop1.setAttribute("offset", "0%")
        stop1.setAttribute("stop-color", "rgb(51, 81, 142)")
        gradient.appendChild(stop1)

        const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
        stop2.setAttribute("offset", "100%")
        stop2.setAttribute("stop-color", "rgb(51, 81, 142)")
        gradient.appendChild(stop2)

        defs.appendChild(gradient)

        // Mask
        const mask = document.createElementNS("http://www.w3.org/2000/svg", "mask")
        mask.setAttribute("id", `hex-mask-${this.contributor.name.replace(/\s/g,"")}`)
        const maskRect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        maskRect.setAttribute("x", "70")
        maskRect.setAttribute("y", "50")
        maskRect.setAttribute("width", "260")
        maskRect.setAttribute("height", "300")
        maskRect.setAttribute("fill", "white")
        mask.appendChild(maskRect)
        defs.appendChild(mask)

        this.svg.appendChild(defs)

        // Border
        const border = document.createElementNS("http://www.w3.org/2000/svg", "polygon")
        border.setAttribute("points", "200,50 330,125 330,275 200,350 70,275 70,125")
        border.setAttribute("fill", "none")
        border.setAttribute("stroke", `url(#hex-border-gradient-${this.contributor.name.replace(/\s/g,"")})`)
        border.setAttribute("stroke-width", "2")
        border.setAttribute("stroke-linecap", "round")
        this.svg.appendChild(border)

        // Groep
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g")
        g.setAttribute("clip-path", `url(#hex-${this.contributor.name.replace(/\s/g,"")})`)

        const image = document.createElementNS("http://www.w3.org/2000/svg", "image")
        image.setAttribute("href", `../static/images/${this.contributor.git_image}`)
        image.setAttribute("x", "70")
        image.setAttribute("y", "50")
        image.setAttribute("width", "260")
        image.setAttribute("height", "300")
        image.setAttribute("preserveAspectRatio", "xMidYMid slice")

        g.setAttribute("transform", "translate(200,200) scale(0.8) translate(-200,-200)")
        g.appendChild(image)

        // Donkere overlay
        const overlay = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        overlay.setAttribute("x", "70")
        overlay.setAttribute("y", "50")
        overlay.setAttribute("width", "260")
        overlay.setAttribute("height", "300")
        overlay.setAttribute("fill", "rgba(0,0,0,0.3)")
        g.appendChild(overlay)

        // <a> link
        const link = document.createElementNS("http://www.w3.org/2000/svg", "a")
        link.setAttribute("href", this.contributor.git_url)
        link.setAttribute("target", "_blank")
        link.appendChild(g)
        this.svg.appendChild(link)
    }

    private createName(): void
    {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
        text.setAttribute("x", "200")
        text.setAttribute("y", "420")
        text.setAttribute("text-anchor", "middle")
        text.setAttribute("fill", "white")
        text.setAttribute("font-size", "36")
        text.setAttribute("font-weight", "bold")
        text.textContent = this.contributor.name
        this.svg.appendChild(text)
    }
}