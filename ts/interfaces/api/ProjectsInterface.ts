export interface ProjectsInterface
{
    id: number
    title: string
    subtitle: string | null
    description: string
    link: string
    year: number
    datetime: string
    excerpt: string | null
    github: string
    featured: boolean
    in_progress: boolean
    languages: ProjectLanguages[]
    frameworks: ProjectFrameworks[]
    images: ProjectImage[]
    specifications: ProjectSpecification[]
    paragraphs: ProjectParagraph[]
}

export interface ProjectLanguages {
    name: string;
    svg_url: string;
}

export interface ProjectFrameworks {
    name: string;
    svg_url: string;
}

export interface ProjectImage {
    image_url: string
    alt_text: string
    is_main_image: boolean
    is_logo: boolean
}

export interface ProjectSpecification {
    specification: string
    category: "PROTOCOL" | "HARDWARE" | "SOFTWARE" | "OTHER"
}

export interface ProjectParagraph {
    order: number
    title: string
    subparagraphs: ProjectSubParagraph[]
}

export interface ProjectSubParagraph {
    order: number
    content: string
}
