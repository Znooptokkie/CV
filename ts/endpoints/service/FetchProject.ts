import { Fetch } from "../utils/Fetch.js"
import { ProjectsInterface } from "../../interfaces/api/ProjectsInterface.js";
import { ProjectType } from "../../types/projects.type.js"

export class FetchProject
{
    private static cache: Map<string, ProjectType> = new Map();

    public async getProjectData(projectName: string | undefined): Promise<ProjectType>
    {
        if (!projectName)
            throw new Error("Project name is required");

        if (FetchProject.cache.has(projectName))
            return FetchProject.cache.get(projectName)!;

        const fetchProject = await Fetch.fetchDetail<ProjectsInterface>(`project/${projectName}`);

        const project: ProjectType = {
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
            contributors: fetchProject.contributors ?? [],

            logo: fetchProject.images.find(img => img.is_logo) ?? null,
            mainImages: fetchProject.images.filter(img => img.is_main_image) ?? [],
        };

        FetchProject.cache.set(projectName, project);

        return project;
    }
}
