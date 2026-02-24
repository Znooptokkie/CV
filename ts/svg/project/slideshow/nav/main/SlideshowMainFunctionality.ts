import { SlideshowState } from "../SlideshowState";

/**
 * SlideshowMainFunctionality koppelt de slideshow-state aan een SVGImageElement en knoppen
 */
export class SlideshowMainFunctionality
{
    private imageElement: SVGImageElement | null = null;
    private handleNext = () => this.state.next();
    private handlePrev = () => this.state.previous();

    constructor(private state: SlideshowState) 
    {
        this.state.subscribe(() => this.updateDOM());
    }

    public setImageElement(el: SVGImageElement) 
    {
        this.imageElement = el;
    }

    private updateDOM() 
    {
        const current = this.state.getCurrent();

        if (this.imageElement && current) 
            this.imageElement.setAttribute("href", `/static/images/${current.image_url}`);
    }

    public bindNavigation(nextId = "slideshow-next-button", prevId = "slideshow-previous-button") 
    {    
        const next = document.getElementById(nextId);
        const prev = document.getElementById(prevId);

        if (next) 
            next.onclick = this.handleNext;

        if (prev)
            prev.onclick = this.handlePrev;
    }

}
