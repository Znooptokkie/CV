import { ProjectParagraph, ProjectSpecification } from "../../interfaces/api/ProjectsInterface.js"
import { ProjectType, ProjectFrameworkType, ProjectImageType, ProjectLanguageType } from "../../types/projects.type.js"

export class Project 
{
    public title: string
    public subtitle: string | null
    public description: string | null
    public link: string
    public year: number
    public datetime: string
    public github: string
    public featured: boolean
    public inProgress: boolean
    public languages: ProjectLanguageType[]
    public frameworks: ProjectFrameworkType[]
    public images: ProjectImageType[]
    public specifications: ProjectSpecification[]
    public paragraphs: ProjectParagraph[]
    
    public mainImages: ProjectImageType[]
    public logo: ProjectImageType | null
    
    constructor(data: ProjectType) 
    {
        this.title = data.title
        this.subtitle = data.subtitle
        this.description = data.description
        this.link = data.link
        this.year = data.year
        this.datetime = data.datetime
        this.github = data.github
        this.featured = data.featured
        this.inProgress = data.in_progress
        this.languages = data.languages
        this.frameworks = data.frameworks
        this.images= data.images
        this.specifications = data.specifications
        this.paragraphs = data.paragraphs

        this.logo = data.logo
        this.mainImages = data.mainImages
    }

    /**
     * Retourneer één willekeurige afbeelding uit mainImages
     */
    public getRandomOtherImage(): ProjectImageType | null 
    {
        if (!this.mainImages.length) return null

        const index = Math.floor(Math.random() * this.mainImages.length)
        return this.mainImages[index]
    }

    /**
     * Optioneel: retourneer de eerste N favorieten afbeeldingen
     */
    public getFavoriteImages(count = 3): ProjectImageType[] 
    {
        return this.mainImages.slice(0, count)
    }
}
