/**
 * CalcResizeContainer
 * 
 * Meet en bewaart de breedte en hoogte van een HTML-element en past deze aan bij window-resize events.
 */
export class CalcResizeContainer
{
    // Houdt een referentie bij naar het doel-HTML-element en slaat de huidige afmetingen op
    private contentSelector: string
    private content: HTMLElement | Element | null = null
    private contentWidth: number | null = null
    private contentHeight: number | null = null

    // Initialiseert de container door een element te selecteren via CSS-selector
    // en leest direct de initiële breedte en hoogte uit
    constructor(contentSelector: string)
    {
        this.contentSelector = contentSelector
    }

    public getDOMContent(): void
    {
        const getElement = document.querySelector(`${this.contentSelector}`)
        
        if (!getElement)
            console.error(`Can't find element: ${getElement}`)
        
        this.content = getElement
        this.contentWidth = this.content!.getBoundingClientRect().width
        this.contentHeight = this.content!.getBoundingClientRect().height
    }

    // Luistert naar window resize events en update de breedte en hoogte dynamisch
    public getContentSize(): void
    {   
        window.addEventListener("resize", () => {
            this.contentWidth = this.content!.getBoundingClientRect().width
            this.contentHeight = this.content!.getBoundingClientRect().height
        })
    }   
 
    // Geeft de huidige hoogte van het element terug
    public get getContentHeight() : number | null
    {
        return this.contentHeight ? this.contentHeight : null
    }
}
