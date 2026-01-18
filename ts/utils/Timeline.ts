export class TimelineAnimation 
{
  private timeline: HTMLElement | null;
  private elements: HTMLElement[];
  private observer: IntersectionObserver | null = null;

  constructor(timelineSelector: string = '.timeline', contentSelector: string = '.timeline-content') 
  {
    this.timeline = document.querySelector(timelineSelector);
    this.elements = Array.from(document.querySelectorAll(contentSelector)) as HTMLElement[];
    this.initialize();
  }

  private initialize(): void 
  {
    this.elements.forEach((el, i) => 
    {
      el.dataset.srIndex = i.toString();
      el.style.opacity = '0';
      el.style.transform = 'translateX(0)';
      (el as any)._isVisible = false;
    });

    if (!('IntersectionObserver' in window)) 
    {
      this.fallback();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => 
      {
        entries.forEach((entry) => 
        {
          const el = entry.target as HTMLElement;
          const index = parseInt(el.dataset.srIndex || '0', 10);
          const delay = index * 120;

          if (entry.isIntersecting && !(el as any)._isVisible) 
          {
            setTimeout(() => 
            {
              el.style.opacity = '1';
              el.style.transform = 'translateX(0)';
              const img = el.previousElementSibling as HTMLElement | null;

              if (img && img.classList.contains('timeline-img')) 
              {
                img.classList.add('active');
              }

              (el as any)._isVisible = true;

              if (index < this.elements.length - 1) 
              {
                this.drawLineForItem(index);
              }
            }, delay);
          }

          if (!document.body.contains(el)) 
          {
            this.observer?.unobserve(el);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

    this.elements.forEach((el) => this.observer?.observe(el));
  }

  private drawLineForItem(index: number): void 
  {
    const timelineItems = Array.from(document.querySelectorAll('.timeline-item')) as HTMLElement[];
    const currentItem = timelineItems[index];
    const nextItem = timelineItems[index + 1];

    if (!currentItem || !nextItem) 
    {
      // console.warn(`Item ${index}: Missing current or next item`);
      return;
    }

    const currentDot = currentItem.querySelector('.timeline-img') as HTMLElement | null;
    const nextDot = nextItem.querySelector('.timeline-img') as HTMLElement | null;

    if (currentDot && nextDot) 
    {
      const top = currentDot.offsetTop + currentDot.offsetHeight + 15;
      let height = nextDot.offsetTop - (currentDot.offsetTop + currentDot.offsetHeight) - 30;

      const lineLeft = currentDot.offsetLeft + currentDot.offsetWidth / 2 - 2.5;

      const line = document.createElement('div');
      line.className = 'timeline-line-segment';
      line.style.top = `${top}px`;
      line.style.left = `${lineLeft}px`;

      if (this.timeline) 
      {
        this.timeline.appendChild(line);
        setTimeout(() => 
        {
          line.style.height = `${height}px`;
          line.style.opacity = '1';
        }, 10);
      } 
    } 
  }

  private drawLines(): void 
  {
    const timelineItems = Array.from(document.querySelectorAll('.timeline-item')) as HTMLElement[];

    for (let index = 0; index < timelineItems.length - 1; index++) 
    {
      this.drawLineForItem(index);
    }
  }

  private fallback(): void 
  {
    this.elements.forEach((el) => 
    {
      el.style.opacity = '1';
      el.style.transform = 'translateX(0)';
      const img = el.previousElementSibling as HTMLElement | null;

      if (img && img.classList.contains('timeline-img')) 
      {
        img.classList.add('active');
      }
      (el as any)._isVisible = true;
    });
    this.drawLines();
  }

  public destroy(): void 
  {
    this.elements.forEach((el) => this.observer?.unobserve(el));
    this.observer?.disconnect();
  }
}