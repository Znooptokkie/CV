import { ProjectImageSlideshowType } from "../../../../types/projects.type";


/**
 * SlideshowState houd bij welke afbeelding er wordt getoond
 */
export class SlideshowState 
{
    public projectImages: ProjectImageSlideshowType[] = [];
    private currentIndex: number = 0;
    private listeners: (() => void)[] = [];

    constructor(images: ProjectImageSlideshowType[]) 
    {
        this.projectImages = images;
        this.setActive(0);
    }

    private setActive(index: number) 
    {
        // this.projectImages = []
        this.projectImages.forEach((img, i) => img.is_active = i === index);
        this.currentIndex = index;
        this.notify();
    }

    public next() 
    { 
        this.setActive((this.currentIndex + 1) % this.projectImages.length); 
    }

    public previous() 
    { 
        this.setActive((this.currentIndex - 1 + this.projectImages.length) % this.projectImages.length); 
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
