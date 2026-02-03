import { FetchProject } from "./service/FetchProject.js";
import { LanguageService } from "./service/LanguageService.js";

export async function initEndpoints(): Promise<void>
{
    await LanguageService.filterItems()
}

export async function initProjectService(projectName: string | undefined): Promise<void>
{
    const fetchProject = new FetchProject()

    const project = await fetchProject.getProjectData(projectName)
    console.log(project);
}