import { ProjectData, ProjectFramework, ProjectImage, ProjectLanguage } from "../../types/projects.type.js"

export class Project {
    public project: string
    public languages: ProjectLanguage[]
    public logo: ProjectImage | null
    public mainImages: ProjectImage[]
    public link: string
    public description: string | null
    public frameworks: ProjectFramework[]

    constructor(data: ProjectData) {
        this.project = data.project
        this.languages = data.languages
        this.logo = data.logo
        this.mainImages = data.mainImages
        this.link = data.link
        this.description = data.description
        this.frameworks = data.frameworks
    }

    /**
     * Retourneer één willekeurige afbeelding uit mainImages
     */
    public getRandomOtherImage(): ProjectImage | null {
        if (!this.mainImages.length) return null

        const index = Math.floor(Math.random() * this.mainImages.length)
        return this.mainImages[index]
    }

    /**
     * Optioneel: retourneer de eerste N favorieten afbeeldingen
     */
    public getFavoriteImages(count = 3): ProjectImage[] {
        return this.mainImages.slice(0, count)
    }
}
