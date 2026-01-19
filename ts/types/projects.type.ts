export type ProjectImage = {
    image_url: string
    alt_text: string
    is_main_image: boolean
    is_logo: boolean
}

export type ProjectLanguage = {
    name: string;
    svg_url: string;
}

export type ProjectFramework = {
    name: string;
    svg_url: string;
}

export type ProjectData = {
    project: string
    languages: ProjectLanguage[]
    logo: ProjectImage | null
    mainImages: ProjectImage[]
    description: string | null
    link: string
    frameworks: ProjectFramework[]
}

export type ProjectsData = ProjectData[]
