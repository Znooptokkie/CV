export class FancyText
{
    private element: HTMLElement = document.querySelector("[data-target-resolver]") as HTMLElement;
    private strings: string[] = ["hey, mijn naam is <span class='green-name'>Atilla Oomen</span>"];
    private counter: number = 0;
    private options: 
    {
        offset: number;
        timeout: number;
        iterations: number;
        characters: string[];
        resolveString?: string;
        element?: HTMLElement;
    };
    private delay: number = 50000;

    constructor(options: Partial<typeof this.options> = {}, delay: number)
    {
        this.delay = delay;

        this.options = Object.assign(
        {
            offset: 0,
            timeout: 5,
            iterations: 10,
            characters: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,!?- ".split("")
        }, options);
    }

    private getRandomInteger(min: number, max: number): number
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private randomCharacter(characters: string[]): string
    {
        return characters[this.getRandomInteger(0, characters.length - 1)];
    }

    private getPartialString(str: string, offset: number): string
    {
        let result = "";
        let count = 0;
        let inTag = false;

        for (let i = 0; i < str.length && count < offset; i++)
        {
            const char = str[i];
            result += char;
            if (char === "<") inTag = true;
            if (char === ">") inTag = false;
            if (!inTag) count++;
        }

        return result;
    }

    private doRandomiserEffect(options: any, callback?: () => void): void
    {
        setTimeout(() =>
        {
            if (options.iterations >= 0)
            {
                const nextOptions = Object.assign({}, options, { iterations: options.iterations - 1 });

                if (options.element)
                {
                    options.element.innerHTML = options.iterations === 0
                        ? options.partialString
                        : options.partialString.substring(0, options.partialString.length - 1) +
                          this.randomCharacter(options.characters);
                }

                this.doRandomiserEffect(nextOptions, callback);
            }
            else if (typeof callback === "function")
            {
                callback();
            }
        }, options.timeout);
    }

    private doResolverEffect(options: any, callback?: () => void): void
    {
        const partialString = this.getPartialString(options.resolveString, options.offset);

        const combinedOptions = Object.assign({}, options, { partialString: partialString });

        this.doRandomiserEffect(combinedOptions, () =>
        {
            const nextOptions = Object.assign({}, options, { offset: options.offset + 1 });

            if (options.offset <= options.resolveString.length)
            {
                this.doResolverEffect(nextOptions, callback);
            }
            else if (typeof callback === "function")
            {
                callback();
            }
        });
    }

    public start(): void
    {
        const run = () =>
        {
            this.options.resolveString = this.strings[this.counter];
            this.options.element = this.element;

            this.doResolverEffect(this.options, () =>
            {
                setTimeout(() =>
                {
                    this.counter++;
                    if (this.counter >= this.strings.length) this.counter = 0;
                    run();
                }, this.delay);
            });
        };

        run();
    }
}