import { SVGCircleAttributes, SVGClipPathAttributes, SVGGroupAttributes, SVGImageAttributes } from "../../../../types/attributes";
import { CalcCircleProperties } from "../../../construct/calculations/CalcCircleProperties.js";
import { CreateSVG } from "../../../construct/core/SVGCreate.js";
import { SVGFactory } from "../../../construct/core/SVGFactory.js";

export class ProfilePicFactory
{
    private SVGElement: CreateSVG | null = null;
    private HTMLIDElement: string = "homepage-banner-profile-pic-svg";
    private viewboxSize: string = "0 0 1200 1200";
    private preserveAspectRatio: string = "xMidYMid meet"

    private innerRadius: number = 375;
    private innerCircumference: number = CalcCircleProperties.calcCircleCircumference(this.innerRadius); 

    private smallRadius: number = 390;
    private mediumRadius: number = 395;
    private largeRadius: number = 400; 

    private createClipPath(): void
    {
        const newClipPathElement = new SVGFactory<SVGClipPathAttributes>(this.SVGElement, "clipPath", 
        {
            id: "circle-inner"
        });
        newClipPathElement.createSvgTag();
    
        const newCircleInClipPath = new SVGFactory<SVGCircleAttributes>(newClipPathElement, "circle", 
        {
            cx: 600,
            cy: 600,
            r: 300
        });
        newCircleInClipPath.createSvgTag();  
    }

    // Dunne binnenrand van de profielfoto
    private createThinInnerBorder(): void
    {
        const thinInnerGroupFactory = new SVGFactory<SVGGroupAttributes>(this.SVGElement, "g",
        {
            class: "thin-inner-border-group"
        });
    
        const thinInnerGroup = thinInnerGroupFactory.createSvgTag();
    
        // Eerste cirkel
        const firstCircleBlockFactory = new SVGFactory<SVGCircleAttributes>(thinInnerGroup, "circle", 
        {
            class: "thin-line-first",
            cx: "600",
            cy: "600",
            r: this.innerRadius,
            stroke: "rgba(46, 204, 113, 0.5)",
            "stroke-width": "30",
            fill: "none",
            "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(600, this.innerCircumference),
        });
        firstCircleBlockFactory.createSvgTag();
    
        // Tweede cirkel met dashoffset
        const secondCircleBlockFactory = new SVGFactory<SVGCircleAttributes>(thinInnerGroup, "circle",
        {
            class: "thin-line-second",
            cx: "600",
            cy: "600",
            r: this.innerRadius,
            stroke: "rgba(46, 204, 113, 0.5)",
            "stroke-width": "30",
            fill: "none",
            "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(300, this.innerCircumference),
            "stroke-dashoffset": 600,
        });
        secondCircleBlockFactory.createSvgTag();
    
        // Derde cirkel met dashoffset
        const thirdCircleBlock = new SVGFactory<SVGCircleAttributes>(thinInnerGroup, "circle",
        {
            class: "thin-line-third",
            cx: "600",
            cy: "600",
            r: this.innerRadius,
            stroke: "rgba(46, 204, 113, 0.5)",
            "stroke-width": "30",
            fill: "none",
            "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(600, this.innerCircumference),
            "stroke-dashoffset": 1500,
        });
        thirdCircleBlock.createSvgTag();
    }

    // Dikke binnenrand van de profielfoto
    private createBigInnerBorder(): void
    {
        const bigInnerGroupFactory = new SVGFactory<SVGGroupAttributes>(this.SVGElement, "g",
        {
            class: "big-inner-border-group"
        });
        const bigInnerGroup = bigInnerGroupFactory.createSvgTag();
    
        const firstCircleBlock = new SVGFactory<SVGCircleAttributes>(bigInnerGroup, "circle",
        {
            class: "big-line-first",
            cx: "600",
            cy: "600",
            r: this.innerRadius,
            stroke: "rgba(46, 204, 113, 1)",
            "stroke-width": "60",
            fill: "none",
            "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(600, this.innerCircumference),
        });
        firstCircleBlock.createSvgTag();
    
        const secondCircleBlock = new SVGFactory<SVGCircleAttributes>(bigInnerGroup, "circle",
        {
            class: "big-line-second",
            cx: "600",
            cy: "600",
            r: this.innerRadius,
            stroke: "rgba(46, 204, 113, 1)",
            "stroke-width": "60",
            fill: "none",
            "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(200, this.innerCircumference),
            "stroke-dashoffset": 750
        });
        secondCircleBlock.createSvgTag();
    }

    // Achtergrondcirkels rond de profielfoto
    private createBackgroundBlocks(): void
    {
        const backgroundGroupFactory = new SVGFactory<SVGGroupAttributes>(this.SVGElement, "g", 
        {
            class: "background-group"
        });
        const backgroundGroup = backgroundGroupFactory.createSvgTag();
    
        // Herhaalde achtergrondcirkels met verschillende stroke-width, radius en dashoffset
        const circleConfigs = [
            { r: this.innerRadius, width: 140, dash: 100, offset: 0, class: "background-first bg-child" },
            { r: this.smallRadius, width: 360, dash: 120, offset: 135, class: "background-second bg-child" },
            { r: this.mediumRadius, width: 120, dash: 120, offset: 270, class: "background-third bg-child" },
            { r: this.mediumRadius, width: 220, dash: 120, offset: 400, class: "background-fourth bg-child" },
            { r: this.largeRadius, width: 80, dash: 120, offset: 535, class: "background-fifth bg-child" },
            { r: this.largeRadius, width: 270, dash: 120, offset: 665, class: "background-sixth bg-child" },
            { r: this.largeRadius, width: 120, dash: 120, offset: 795, class: "background-seventh bg-child" },
            { r: this.largeRadius, width: 60, dash: 120, offset: 925, class: "background-eigth bg-child" },
            { r: this.innerRadius, width: 400, dash: 120, offset: 1000, class: "background-ninth bg-child" },
            { r: this.mediumRadius, width: 60, dash: 80, offset: 1145, class: "background-tenth bg-child" },
            { r: this.largeRadius, width: 400, dash: 100, offset: 1270, class: "background-eleventh bg-child" },
            { r: this.largeRadius, width: 180, dash: 100, offset: 1380, class: "background-twelfth bg-child" },
            { r: this.largeRadius, width: 80, dash: 120, offset: 1510, class: "background-thirtheenth bg-child" },
            { r: this.largeRadius, width: 380, dash: 120, offset: 1640, class: "background-fourteenth bg-child" },
            { r: this.largeRadius, width: 60, dash: 140, offset: 1790, class: "background-fifteenth bg-child" },
            { r: this.largeRadius, width: 120, dash: 140, offset: 1940, class: "background-sixteenth bg-child" },
            { r: this.largeRadius, width: 350, dash: 140, offset: 2090, class: "background-seventeenth bg-child" },
            { r: this.largeRadius, width: 80, dash: 140, offset: 2240, class: "background-eigthteenth bg-child" },
            { r: this.largeRadius, width: 60, dash: 140, offset: 2395, class: "background-nineteenth bg-child" }
        ];
    
        for (const cfg of circleConfigs)
        {
            const circle = new SVGFactory<SVGCircleAttributes>(backgroundGroup, "circle", 
            {
                class: cfg.class,
                cx: "600",
                cy: "600",
                r: cfg.r,
                stroke: "rgba(46, 204, 113, 0.1)",
                "stroke-width": cfg.width,
                fill: "none",
                "stroke-dasharray": CalcCircleProperties.calcStrokeDasharray(cfg.dash, CalcCircleProperties.calcCircleCircumference(cfg.r)),
                "stroke-dashoffset": cfg.offset
            });
            circle.createSvgTag();
        }
    }
    
    // Voeg afbeelding toe binnen clipPath
    private imageElement(): void
    {
        const image = new SVGFactory<SVGImageAttributes>(this.SVGElement, "image",
        {
            class: "svg-image",
            href: "./static/images/myself.webp",
            x: 300,
            y: 300,
            width: 600,
            height: 600,
            "clip-path": "url(#circle-inner)",
            preserveAspectRatio: "xMidYMid slice"
        });
        image.createSvgTag();
    }

    public init()
    {
        this.SVGElement = new CreateSVG(
            this.HTMLIDElement,
            {
                viewBox: this.viewboxSize,
                preserveAspectRatio: this.preserveAspectRatio
            },
            true
        );

        this.createClipPath();
        this.createThinInnerBorder();
        this.createBigInnerBorder();
        this.createBackgroundBlocks();
        this.imageElement();
    }
}