import { ProjectType } from "../../../types/projects.type"

export class ProjectDescriptionFactory
{
    private htmlElement: HTMLElement | null = document.getElementById("project-detail-section-description")

    constructor(
        private projectName: string,
        private projectData: ProjectType
    )
    {
        this.projectName = projectName
        this.projectData = projectData
    }

    public addToParentElement(): void
    {
        if (!this.htmlElement || !this.projectData)
            return
        
        for (const paragraph of this.projectData.paragraphs)
        {
            const paragraphDiv = document.createElement("div")
            
            paragraphDiv.className = `project-description-div`
            
            const title = document.createElement("h2")
            title.textContent = `♦ ${paragraph.title}`
            paragraphDiv.appendChild(title)
            
            for (const subParagraph of paragraph.subparagraphs)
            {
                const paragraphP = document.createElement("p")
                paragraphP.textContent = subParagraph.content
                paragraphDiv.appendChild(paragraphP)
            }

            this.htmlElement.appendChild(paragraphDiv)
        }
            
    }
}