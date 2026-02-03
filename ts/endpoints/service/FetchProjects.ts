// import { FetchData } from "../../../edpoints/services/FetchData.js"
import { Fetch } from "../../endpoints/utils/Fetch.js"
import { ProjectsInterface } from "../../interfaces/api/ProjectsInterface.js"
import { ProjectsType } from "../../types/projects.type.js"


export class FetchProjects 
{
    private projects: ProjectsType = []

    public async getAPIData(): Promise<ProjectsType> 
    {
        const fetchProjects = await Fetch.fetchList<ProjectsInterface>("projects")

        this.projects = fetchProjects.map(proj => ({
            title: proj.title, 
            subtitle: proj.subtitle,
            description: proj.description,
            link: proj.link,
            year: proj.year,
            datetime: proj.datetime,
            github: proj.github,
            featured: proj.featured,
            in_progress: proj.in_progress,
            languages: proj.languages ?? [],
            frameworks: proj.frameworks,
            images: proj.images,
            specifications: proj.specifications,
            paragraphs: proj.paragraphs,

            logo: proj.images.find(img => img.is_logo) ?? null,
            mainImages: proj.images.filter(img => img.is_main_image) ?? [],
        }));

        return this.projects
    }

    public getProjects(): ProjectsType 
    {
        return this.projects
    }
}