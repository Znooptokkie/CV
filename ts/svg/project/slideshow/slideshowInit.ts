import { SlideshowBlockNav } from "./nav/SlideshowBlockNav.js";
import { SlideshowInnerContent } from "./main/factory/SlideshowInnerContent.js";
import { SlideshowContext } from "./main/SlideshowContext.js";
import { SlideshowMainDrawLines, SlideshowMainInstance } from "./main/factory/SlideshowMainSVG.js";
import { FetchProject } from "../../../endpoints/service/FetchProject.js";
import { SlideshowBox } from "./main/factory/SlideshowBox.js";
import { SlideshowState } from "./nav/SlideshowState.js";
import { SlideshowMainFunctionality } from "./nav/main/SlideshowMainFunctionality.js";
import { SmallSVGSlideshow } from "./small/factory/SlideshowSmallSVG.js";
// import { SlideshowSmallFunctionality } from "./nav/small/SlideshowSmallFunctionality.js";
// import { SlideshowAddSmallSVGProperties, SlideshowCreateSmallSVG } from "./small/factory/SlideshowSmallSVG.js";

export async function initSlideshow(projectName: string): Promise<void> 
{
    const svg = new SlideshowMainInstance();
    const context = new SlideshowContext(svg);

    const pathMain = "M10,100 L655,100 L735,25 L1085,25 L1165,100 L1810,100 L1810,250 L1785,275 L1785,1310 L1165,1300 L1085,1375 L735,1375 L655,1300 L35,1300 L35,275 L10,250 L10,100 Z";
    const lines = new SlideshowMainDrawLines(context, pathMain);
    lines.drawContour();

    // Verdeel de SVG in 2 boxes voor duplicate designs
    new SlideshowBox(context);
    new SlideshowBox(context);

    const navBlocks = new SlideshowBlockNav(context);
    navBlocks.createNavBlocks(projectName);

    const fetcher = new FetchProject();
    const projectData = await fetcher.getProjectData(projectName);

    const images = projectData.images
        .filter(img => !img.is_logo)
        .map((img, index) => ({ ...img, is_active: index === 0 }));

    const slideshowState = new SlideshowState(images);

    const mainSlideshow = new SlideshowMainFunctionality(slideshowState);
    mainSlideshow.bindNavigation();

    const smallSlideshow = new SmallSVGSlideshow(slideshowState, projectName);
    // smallSlideshow.initSmallSVGSlideshow();
    // smallSlideshow.initSmallImages()

    const innerContent = new SlideshowInnerContent(context);
    await innerContent.drawInnerContentBorder(projectName, mainSlideshow, slideshowState);
}
