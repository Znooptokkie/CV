import { FetchProject } from "../../../../../../endpoints/service/FetchProject.js";
import { ProjectImage } from "../../../../../../interfaces/api/ProjectsInterface.js";
import { ProjectImageType } from "../../../../../../types/projects.type.js";
import { SVGFactory } from "../../../../../construct/core/SVGFactory.js";
import { SlideshowContext } from "../../SlideshowContext.js";


export class SlideshowBlockNav
{
    constructor(protected context: SlideshowContext) {}
    
    public createNavBlocks(projectName: string): void
    {
        const group = new SVGFactory(this.context.svg.svg, "g", {
            class: `block-navigation-group-${projectName}`
        }).createSvgTag()

        // Top
        new SVGFactory(group, "path", {
            d: "M775,100 L835,45 L1165,45 L1225,100 L775,100 Z",
            id: "slideshow-next-button",
            stroke: "rgb(51, 81, 142)",
            fill: "transparent", // Moet transparent zijn, anders werkt klikken niet????
            "stroke-width": 4
        }).createSvgTag()

        // Top Arrow
        new SVGFactory(group, "path", {
            d: "M1000,60 L1015,85 L985,85 L1000,60 Z",
            stroke: "none",
            fill: "rgb(51, 81, 142)"
        }).createSvgTag()

        // Bottom
        new SVGFactory(group, "path", {
            d: "M775,1300 L1225,1300 L1165,1355 L835,1355 L775,1300 Z",
            id: "slideshow-previous-button",
            stroke: "rgb(51, 81, 142)",
            fill: "transparent",
            "stroke-width": 4
        }).createSvgTag()
        
        // Bottom Arrow
        new SVGFactory(group, "path", {
            d: "M1000,1340 L1015,1315 L985,1315 L1000,1340 Z",
            stroke: "none",
            fill: "rgb(51, 81, 142)"
        }).createSvgTag()
    }
}

export class SlideshowFunctionality
{    
    private projectImages: ProjectImageType[] | null= null
    private currentImage: ProjectImageType | null = null

    private imageElement: SVGImageElement | null

    private currentIndex: number = 0

    constructor(
        private projectName: string,
        imageElement: SVGImageElement | null
    )
    {
        this.imageElement = imageElement
    }


    public async getImages()
    {
        const projectInstance = new FetchProject()
        const projectFetch = await projectInstance.getProjectData(this.projectName)

        this.projectImages = projectFetch.images.filter(
            image => image.is_logo !== true
        )
    }

    public recordWhichImages()
    {
        if (!this.projectImages || this.projectImages.length === 0)
        {
            this.currentImage = null
            return null
        }

        this.currentIndex = 0
        this.currentImage = this.projectImages[this.currentIndex]
    }

    public manipulateDOM()
    {
        const nextButton = document.getElementById("slideshow-next-button")
    
        if (!nextButton)
            return null

        
        nextButton.addEventListener("click", () =>
        {
            console.log(this.projectImages);
            console.log(this.currentImage);
            // nextButton.style.fill = "red"
        
            if (!this.projectImages || this.projectImages.length === 0)
                return
        
            this.currentIndex++

            if (this.currentIndex >= this.projectImages.length)
                this.currentIndex = 0
        
            this.currentImage = this.projectImages[this.currentIndex]

            if (this.imageElement && this.currentImage)
                this.imageElement.setAttribute("href", `../static/images/${this.currentImage.image_url}`)
        })

        const previousButton = document.getElementById("slideshow-previous-button")

        if (!previousButton)
            return null

        previousButton.addEventListener("click", () =>
        {
            // previousButton.style.fill = "red"
        
            if (!this.projectImages || this.projectImages.length === 0)
                return
        
            this.currentIndex--

            if (this.currentIndex < 0)
                this.currentIndex = this.projectImages.length - 1
        
            this.currentImage = this.projectImages[this.currentIndex]

            if (this.imageElement && this.currentImage)
                this.imageElement.setAttribute("href", `../static/images/${this.currentImage.image_url}`)
        })
    }

    public setImageElement(el: SVGImageElement)
    {
        this.imageElement = el
    }


    public getCurrentImage()
    {
        return this.currentImage
    }
}