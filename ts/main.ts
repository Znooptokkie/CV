import { initEndpoints } from "./endpoints/initEndpoints.js";

import { TimelineAnimation } from "./utils/Timeline.js";
import { Background } from "./utils/Background.js";
import { Dropdown } from "./utils/NavDropdown.js";

import { FancyText } from "./svg/views/homepage/FancyText.js";
import { ProfilePicFactory } from "./svg/homepage/factory/profile_pic/ProfilePicFactory.js";
import { exportClass } from "./svg/homepage/factory/programming_languages/main/LanguagesFactory.js";
import { LanguageSmallBorder } from "./svg/homepage/factory/programming_languages/small/LanguageSmallFactory.js";
import { initProjects } from "./svg/projects/projectsInit.js"

new Background("stars", 50);
const navDropdown = new Dropdown();

initEndpoints();

new TimelineAnimation();

document.addEventListener("DOMContentLoaded", () => 
{
    navDropdown.checkForButton();

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
        initProjects()
    }
})