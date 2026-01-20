// import { FetchData } from "../../../edpoints/services/FetchData.js"
import { Fetch } from "../../../endpoints/utils/Fetch.js"
import { ProjectsInterface } from "../../../interfaces/api/ProjectsInterface.js"
import { ProjectData } from "../../../types/projects.type.js"


export class FetchProjects 
{
    private projects: ProjectData[] = []

    public async getAPIData(): Promise<ProjectData[]> 
    {
        const fetcher = await Fetch.fetchJSON<ProjectsInterface>("projects")
        // const result = await fetcher.fetchJsonData()

        this.projects = fetcher.map(proj => ({
            project: proj.title, 
            languages: proj.languages ?? [],
            logo: proj.images.find(img => img.is_logo) ?? null,
            mainImages: proj.images.filter(img => img.is_main_image) ?? [],
            description: proj.description,
            link: proj.link,
            frameworks: proj.frameworks,
        }));

        // console.log(this.projects);

        return this.projects
    }

    public getProjects(): ProjectData[] 
    {
        return this.projects
    }
}