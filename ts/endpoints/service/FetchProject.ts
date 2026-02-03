import { Fetch } from "../utils/Fetch.js"
import { ProjectsInterface } from "../../interfaces/api/ProjectsInterface.js";
import { ProjectType } from "../../types/projects.type.js"

export class FetchProject
{
    private project: ProjectType | null = null;

    public async getProjectData(projectName: string | undefined): Promise<ProjectType>
    {
        const fetchProject = await Fetch.fetchDetail<ProjectsInterface>(`project/${projectName}`);

        this.project = {
            title: fetchProject.title, 
            subtitle: fetchProject.subtitle,
            description: fetchProject.description,
            link: fetchProject.link,
            year: fetchProject.year,
            datetime: fetchProject.datetime,
            github: fetchProject.github,
            featured: fetchProject.featured,
            in_progress: fetchProject.in_progress,
            languages: fetchProject.languages ?? [],
            frameworks: fetchProject.frameworks ?? [],
            images: fetchProject.images ?? [],
            specifications: fetchProject.specifications ?? [],
            paragraphs: fetchProject.paragraphs ?? [],

            logo: fetchProject.images.find(img => img.is_logo) ?? null,
            mainImages: fetchProject.images.filter(img => img.is_main_image) ?? [],
        }
        return this.project
    }
    
    public getProject(): ProjectType | null
    {
        return this.project
    }
}