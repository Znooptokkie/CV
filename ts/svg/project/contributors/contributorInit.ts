import { ProjectType } from "../../../types/projects.type";
import { ProjectContributorFactory } from "./ProjectContributorFactory.js";

export function contributorInit(projectData: ProjectType)
{
    const createContributors = new ProjectContributorFactory("project-detail-contributors-svg", projectData)
    createContributors.createEachSpecification()
}