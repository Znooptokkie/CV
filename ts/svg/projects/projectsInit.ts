import { InitPath } from "../construct/InitPath.js"
import { FetchProjects } from "./fetch/FetchProjects.js"
import { Project } from "./Project.js"
import { ProjectsRootElement } from "./factory/ProjectsFactory.js"
import { ProjectsButton } from "./factory/ProjectsButton.js"
import { ProjectsContent } from "./factory/ProjectsContent.js"
import { ProjectsInnerHTMLContent } from "./factory/ProjectsInnerHTML.js"
import { ProjectsStackBanners } from "./factory/ProjectsStackBanners.js"

export async function initProjects()
{
    const HexagonPath = "M250,0 L500,166.667 L500,433.333 L250,600 L0,433.333 L0,166.667 L250,0"

    const pathContent = "M1300,0 L3570,0 L3570,900 L3125,900 L3020,1060 L1500,1060 L1280,886.666 L1280,620 L1040,433.333 L1040,166.667 Z"
    const pathContentInner = "M1320,35 L3535,35 L3535,870 L3045,870 L2945,1025 2615,1025 M1860,1025 L1520,1025 L1315,866.666 L1315,595 L1075,413.333 L1075,191.667 L1320,35"

    const pathLanguages = "M1450,-20 L1560,-20 L1560,90 L1505,125 L1450,90 L1450,-20" 

    const fetcher = new FetchProjects()

    const projectDataArray = await fetcher.getAPIData()

    const projects: Project[] = ProjectsRootElement.createMany(projectDataArray)

    const rootElements = projects.map(projectName => ProjectsRootElement.createRootElement(projectName.project))

    for (let i = 0; i < rootElements.length; i++)
    {
        const root = rootElements[i]
        const project = projects[i]
        const projectName = projects[i].project.toLocaleLowerCase()

        const defs = ProjectsRootElement.createDefs(root)
        
        // CONTENT
        const drawContentLine = ProjectsContent.drawBorder(rootElements[i], pathContent)
        const drawInnerContentLine = ProjectsContent.drawBorder(rootElements[i], pathContentInner, {opacity: 0.5})

        InitPath.createBorderParts(root!, HexagonPath, ProjectsRootElement.createInnerHexaPath(), "hexa")
        
        const pathElement = ProjectsInnerHTMLContent.createLanguagePaths(root!, pathContentInner)
        ProjectsInnerHTMLContent.initContent(root!, pathElement, projectName, project.description!)

        // LANGUAGES AND FRAMEWORKS
        const languagesAndFrameworks = project.languages.filter(lang => lang.name.toLowerCase() !== "micropython").concat(project.frameworks);

        for (const [index, lf] of languagesAndFrameworks.entries()) 
        {
            const languagePath = ProjectsStackBanners.createLanguagePaths(root, index);
            ProjectsStackBanners.getDevIcons(root, lf.svg_url, languagePath, index);
        }



        ProjectsContent.drawArrows(root, 8)
        const button = ProjectsButton.linkInstance(root!, project.link)

        ProjectsRootElement.addClipPathToDefs(defs, projectName, HexagonPath)
        
        ProjectsRootElement.createLogo(root, project.logo!.image_url, projectName)
        ProjectsRootElement.createHexImages(
            root,
            project.mainImages.map((img: { image_url: string }) => img.image_url),
            projectName
        )
    }
}