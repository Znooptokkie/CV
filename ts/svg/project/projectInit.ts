import { FetchProject } from "../../endpoints/service/FetchProject.js";
import { ProjectType } from "../../types/projects.type";
import { contributorInit } from "./contributors/contributorInit.js";
import { ProjectDescriptionFactory } from "./description/ProjectDescriptionFactory.js";
import { initSlideshow } from "./slideshow/slideshowInit.js";
import { specInit } from "./specifications/specInit.js";

export async function fetchProject(projectName: string): Promise<ProjectType>
{
    const fetcher = new FetchProject();
    return await fetcher.getProjectData(projectName);
}

export function projectInit(projectName: string, projectData: ProjectType)
{   
    initSlideshow(projectName, projectData)
    const projectDescription = new ProjectDescriptionFactory(projectName, projectData)
    projectDescription.addToParentElement()
    specInit(projectData)
    contributorInit(projectData)
}