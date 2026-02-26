import { ProjectType } from "../../../types/projects.type"

export class ProjectSpecificationFactory
{
    constructor(
        private allSpecNames: Array<string>,
        private HTMLID: string,
        private projectData: ProjectType
    ) {}

    public createEachSpecification(): void
    {
        if (!this.HTMLID) return

        const htmlContainer = document.getElementById(this.HTMLID)
        if (!htmlContainer) return

        for (const spec of this.allSpecNames)
        {
            const specification = new ProjectSpecificationUnit(spec)
            specification.setProjectData(this.projectData)
            htmlContainer.appendChild(specification.createHTMLElement())
        }
    }
}

export class ProjectSpecificationUnit
{
    private projectData: ProjectType | null = null

    constructor(private specificationName: string) {}

    public setProjectData(projectData: ProjectType): void
    {
        this.projectData = projectData
    }

    public createHTMLElement(): HTMLElement
    {
        const wrapper = document.createElement("div")
        wrapper.className = "spec-accordion-item"

        const contentDiv = this.buildContent()

        const svgComponent = new ProjectSpecificationSVG(wrapper)
        svgComponent.init(this.specificationName, contentDiv)

        return wrapper
    }

    private buildContent(): HTMLElement
    {
        const contentDiv = document.createElement("div")
        contentDiv.className = "spec-html-content"

        const ul = document.createElement("ul")

        let hasSpecifications = false

        for (const spec of this.projectData!.specifications)
        {
            if (this.specificationName.toLowerCase() === spec.category.toLowerCase())
            {
                const li = document.createElement("li")
                li.textContent = spec.specification
                ul.appendChild(li)
                hasSpecifications = true
            }
        }

        if (hasSpecifications)
        {
            contentDiv.appendChild(ul)
        }
        else
        {
            const nvt = document.createElement("p")
            nvt.textContent = "n.v.t."
            contentDiv.appendChild(nvt)
        }

        return contentDiv
    }
}

export class ProjectSpecificationSVG
{
    private svgNS = "http://www.w3.org/2000/svg"

    private svg!: SVGSVGElement
    private border!: SVGRectElement
    private headerPath!: SVGPathElement
    private foreign!: SVGForeignObjectElement

    private headerHeight = 40
    private baseHeight = 50

    constructor(private wrapper: HTMLElement) {}

    public init(title: string, htmlContent: HTMLElement): void
    {
        this.createSVG()
        this.createBorder()
        this.createHeaderPath(title)
        this.createForeignObject(htmlContent)
        // toggle wordt nu in createHeaderPath afgehandeld
    }

    private createSVGElement<T extends keyof SVGElementTagNameMap>(
        tag: T
    ): SVGElementTagNameMap[T]
    {
        return document.createElementNS(this.svgNS, tag) as SVGElementTagNameMap[T]
    }

    private createSVG(): void
    {
        this.svg = this.createSVGElement("svg")
        this.svg.setAttribute("viewBox", `-5 -5 610 ${this.baseHeight + 10}`)
        this.svg.classList.add("spec-accordion-svg")
        this.wrapper.appendChild(this.svg)
    }

    private createBorder(): void
    {
        this.border = this.createSVGElement("rect")
        this.border.setAttribute("x", "0")
        this.border.setAttribute("y", "0")
        this.border.setAttribute("width", "600")
        this.border.setAttribute("height", this.baseHeight.toString())
        // this.border.setAttribute("rx", "12")
        this.border.classList.add("spec-border")
        this.svg.appendChild(this.border)
    }

    private createHeaderPath(title: string): void
    {
        const group = this.createSVGElement("g")
        group.setAttribute("class", "accordion-header-group")

        const firstArrowLeft = "M0,20 L20,0 L25,0 L5,20 L25,40 L20,40 L0,20"
        const secondArrowLeft = "M15,20 L35,0 L40,0 L20,20 L40,40 L35,40 L15,20"
        const midPart = "M30,20 L50,0 L550,0 L570,20 L550,40 L50,40 L30,20"
        const firstArrowRight = "M580,20 L560,0 L565,0 L585,20 L565,40 L560,40 L580,20"
        const secondArrowRight = "M595,20 L575,0 L580,0 L600,20 L580,40 L575,40 L595,20"
    
        const mainPathE = this.createSVGElement("path")
        mainPathE.setAttribute("class", "accordion-header-path")
        mainPathE.setAttribute("d", `${firstArrowLeft} ${secondArrowLeft} ${midPart} ${firstArrowRight} ${secondArrowRight}`)
        mainPathE.setAttribute("stroke", "rgba(51, 81, 142, 0.5)")
        mainPathE.setAttribute("stroke-width", "2")
        mainPathE.setAttribute("vector-effect", "non-scaling-stroke")
    
        const text = this.createSVGElement("text")
        text.setAttribute("class", "accordion-title")
        text.setAttribute("x", "300")
        text.setAttribute("y", (this.headerHeight / 2).toString())
        text.setAttribute("dominant-baseline", "middle")
        text.setAttribute("text-anchor", "middle")
        text.textContent = title.toUpperCase()
    
        group.appendChild(mainPathE)
        group.appendChild(text)
    
        group.addEventListener("click", () => this.toggleContent())
    
        this.svg.appendChild(group)
    }

    private createHeaderPathFigures(): void
    {

    }

    private createForeignObject(htmlContent: HTMLElement): void
    {
        this.foreign = this.createSVGElement("foreignObject")
        this.foreign.setAttribute("x", "0")
        this.foreign.setAttribute("y", this.headerHeight.toString())
        this.foreign.setAttribute("width", "600")
        this.foreign.setAttribute("height", "0")
        this.foreign.classList.add("spec-content")
        this.foreign.appendChild(htmlContent)
        this.svg.appendChild(this.foreign)
    }

    private toggleContent(): void
    {
        const isOpen = this.svg.classList.toggle("open")

        const htmlContent = this.foreign.firstElementChild as HTMLElement
        if (!htmlContent) return

        if (isOpen)
        {
            requestAnimationFrame(() =>
            {
                const contentHeight = htmlContent.scrollHeight
                const totalHeight = this.headerHeight + contentHeight 
                const extra = 4   // ruimte voor border 

                this.foreign.setAttribute("height", (contentHeight + extra).toString())

                this.svg.setAttribute(
                    "viewBox",
                    `-5 -5 610 ${totalHeight + 10 + extra}`
                )

                this.border.setAttribute("height", totalHeight.toString())
            })
        }
        else
        {
            this.foreign.setAttribute("height", "0")

            this.svg.setAttribute(
                "viewBox",
                `-5 -5 610 ${this.baseHeight + 10}`
            )

            this.border.setAttribute("height", this.baseHeight.toString())
        }
    }
}