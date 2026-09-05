import { ProjectImageSlideshowType } from "../../../../types/projects.type";


/**
 * SlideshowState houd bij welke afbeelding er wordt getoond
 */
export class SlideshowState 
{
    public projectImages: ProjectImageSlideshowType[] = [];
    public currentIndex: number = 0;
    public windowStartIndex: number = 0 // Slideing window
    private listeners: (() => void)[] = [];

    constructor(images: ProjectImageSlideshowType[]) 
    {
        this.projectImages = images;
        this.setActive(0);
    }

    public setActive(index: number) 
    {
        this.projectImages.forEach((img, i) => img.is_active = i === index)
        this.currentIndex = index
    
        const maxVisible = 7
    
        if (this.currentIndex >= this.windowStartIndex + maxVisible) 
            this.windowStartIndex = this.currentIndex - maxVisible + 1
    
        if (this.currentIndex < this.windowStartIndex)
            this.windowStartIndex = this.currentIndex
    
        if (this.currentIndex === 0) 
            this.windowStartIndex = 0
    
        this.notify()
    }

    public next() 
    { 
        const newIndex = (this.currentIndex + 1) % this.projectImages.length;
        this.setActive(newIndex); 
    }

    public previous() 
    { 
        const newIndex = (this.currentIndex - 1 + this.projectImages.length) % this.projectImages.length;
        this.setActive(newIndex); 
    }

    public getCurrent() 
    { 
        return this.projectImages[this.currentIndex] ?? null; 
    }

    public subscribe(callback: () => void) 
    {
        this.listeners.push(callback);
    }

    private notify() 
    {
        this.listeners.forEach(callbackF => callbackF());
    }
}