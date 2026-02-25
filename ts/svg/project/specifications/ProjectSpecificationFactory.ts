import { ProjectType } from "../../../types/projects.type"

export class ProjectSpecificationFactory
{
    constructor(
        private allSpecNames: Array<string>,
        private HTMLID: string,
        private projectData: ProjectType
    
    )
    {
        this.allSpecNames = allSpecNames
        this.HTMLID = HTMLID
    }

    public createEachSpecification(): void
    {
        if (!this.HTMLID)
            return

        const htmlContainer = document.getElementById(this.HTMLID) 

        for (const spec of this.allSpecNames)
        {
            const specification = new ProjectSpecificationUnit(spec)
            specification.setProjectData(this.projectData)
            const createElements = specification.createHTMLElement()
            htmlContainer?.appendChild(createElements)
        }
    }
    
}

export class ProjectSpecificationUnit
{   
    private projectData: ProjectType | null = null

    constructor(
        private specificationName: string,
    )
    {
        this.specificationName = specificationName
    }

    public setProjectData(projectData: ProjectType)
    {
        this.projectData = projectData
    }

    public createHTMLElement(): HTMLElement
    {
        const parent = document.createElement("div")
        parent.className = "spec-accordion-item"

        const specTitle = document.createElement("h3")
        specTitle.className = "spec-accordion-header"
        specTitle.textContent = this.specificationName.toUpperCase()
        parent.appendChild(specTitle)

        const content = document.createElement("div")
        content.className = "spec-accordion-content"
        parent.appendChild(content)

        const ul = document.createElement("ul")
        ul.className = "spec-accordion-ul"

        let hasSpecifications = false

        for (const spec of this.projectData!.specifications)
        {            
            if (this.specificationName.toLowerCase() === spec.category.toLowerCase())
            {
                const li = document.createElement("li")
                li.className = "spec-accordion-li"
                li.textContent = spec.specification
                ul.appendChild(li)

                hasSpecifications = true
            }
        }

        if (hasSpecifications)
        {
            content.appendChild(ul)
        }
        else
        {
            const nvt = document.createElement("p")
            nvt.textContent = "n.v.t."
            content.appendChild(nvt)
        }

        return parent
    }
}
