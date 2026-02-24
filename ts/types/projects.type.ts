import { ProjectParagraph, ProjectSpecification } from "../interfaces/api/ProjectsInterface"

export interface ProjectImageSlideshowType extends ProjectImageType 
{
    is_active: boolean;
}

export type ProjectImageType = {
    image_url: string
    alt_text: string
    is_main_image: boolean
    is_logo: boolean
}

export type ProjectLanguageType = {
    name: string;
    svg_url: string;
}

export type ProjectFrameworkType = {
    name: string;
    svg_url: string;
}

export type ProjectType = {
    title: string
    subtitle: string | null
    description: string | null
    link: string
    year: number
    datetime: string
    github: string
    featured: boolean
    in_progress: boolean
    languages: ProjectLanguageType[]
    frameworks: ProjectFrameworkType[]
    images: ProjectImageType[]
    specifications: ProjectSpecification[]
    paragraphs: ProjectParagraph[]

    logo: ProjectImageType | null
    mainImages: ProjectImageType[]
}

export type ProjectsType = ProjectType[]