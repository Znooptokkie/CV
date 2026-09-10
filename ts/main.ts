// import { initEndpoints, initProjectService } from "./endpoints/initEndpoints.js";

import { TimelineAnimation } from "./utils/Timeline.js";
import { Background } from "./utils/Background.js";
import { Dropdown } from "./utils/NavDropdown.js";

import { FancyText } from "./svg/views/homepage/FancyText.js";

import { ProfilePicFactory } from "./svg/homepage/factory/profile_pic/ProfilePicFactory.js";
import { exportClass } from "./svg/homepage/factory/programming_languages/main/LanguagesFactory.js";
import { LanguageSmallBorder } from "./svg/homepage/factory/programming_languages/small/LanguageSmallFactory.js";

import { initProjects } from "./svg/projects/projectsInit.js"
import { initSlideshow } from "./svg/project/slideshow/slideshowInit.js"
import { fetchProject, projectInit } from "./svg/project/projectInit.js";
import { ProjectType } from "./types/projects.type.js";
import { Console } from "./utils/Console.js";
import { LoadingScreen } from "./utils/LoadingScreen.js";
import { LoadAssets } from "./utils/loading_screen/WaitForAssets.js";

// Website background
new Background("stars", 50);

// Loading screen background
new Background("page-loader-stars", 50);

const navDropdown = new Dropdown();

new TimelineAnimation();


document.addEventListener("DOMContentLoaded", async () => 
{
    const loadingScreen = new LoadingScreen("page-loader-svg-animation")
    loadingScreen.init()

    navDropdown.checkForButton();

    // Funny extra thing in the console
    Console.logoInConsole()

    // Check which page is shown
    const whichPage = document.body.dataset.page

    // Project naam (URL friendly)
    const projectName = document.body.dataset.project_name

    // Homepage
    if (window.location.pathname === "/")
    {
        // Banner
        new FancyText({ timeout: 5, iterations: 10 }, 50000).start();
        const profilePicSVG = new ProfilePicFactory;
        profilePicSVG.init();

        // Third section -- Programming Languages main container
        exportClass();

        // Third section -- Programming Languages 8 smaller containers
        new LanguageSmallBorder().createInnerPath();
    }

    if (window.location.pathname === "/projecten/")
    {
        await initProjects()
    }

    if (whichPage === "project_detail_page") // ---- ALLE PAGINA'S MOETEN OP DEZE MANIER@#%^%$#$@
    {
        const project = await fetchProject(projectName!)
        projectInit(projectName!, project)
    }

    // Wait for al content to be loaded
    // When finished, hide loading screen
    await LoadAssets.waitForAssets()
    loadingScreen.finish()
})