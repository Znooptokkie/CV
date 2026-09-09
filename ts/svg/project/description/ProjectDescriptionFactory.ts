import { ProjectType } from "../../../types/projects.type"

import { CreateProjectDescriptionParagraphTitleSVG } from "./ProjectDescriptionParagraphTitle.js"

export class ProjectDescriptionFactory
{
    private htmlElement: HTMLElement | null = document.getElementById("project-detail-section-description")

    constructor(
        private projectName: string,
        private projectData: ProjectType
    ) {}

    public addToParentElement(): void
    {
        if (!this.htmlElement || !this.projectData)
            return

        for (let i = 0; i < this.projectData.paragraphs.length; i++)
        {
            const paragraph = this.projectData.paragraphs[i]

            const paragraphDiv = document.createElement("div")

            paragraphDiv.className = "project-description-div"
            paragraphDiv.id = `project-description-${i}`

            // Voeg parent van SVG toe aan de DOM
            this.htmlElement.appendChild(paragraphDiv)

            // Maak de SVG
            const descriptionSVGClass = new CreateProjectDescriptionParagraphTitleSVG(
                paragraphDiv,
                `project-description-svg-${i}`
            )
            descriptionSVGClass.init()
                    
            descriptionSVGClass.createParagraphTitle(
                descriptionSVGClass.getSVGElement(),
                paragraph.title
            )

            descriptionSVGClass.dynamicStartPoints("left")
            descriptionSVGClass.createParts()

            descriptionSVGClass.dynamicStartPoints("right")
            descriptionSVGClass.createParts()
            
            for (const subParagraph of paragraph.subparagraphs)
            {
                const paragraphP = document.createElement("p")
            
                paragraphP.textContent = subParagraph.content
                paragraphP.style.textAlign = "center"
            
                paragraphDiv.appendChild(paragraphP)
            }
        }
    }
}