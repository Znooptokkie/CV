export class LoadAssets
{
    static async waitForAssets(): Promise<void>
    {
        const images = Array.from(document.images)

        await Promise.all(
            images.map((image) =>
            {
                if (image.complete)
                    return Promise.resolve()

                return new Promise<void>((resolve) =>
                {
                    image.addEventListener("load", () => resolve(), { once: true })
                    image.addEventListener("error", () => resolve(), { once: true })
                })
            })
        )

        await document.fonts.ready
    }
}