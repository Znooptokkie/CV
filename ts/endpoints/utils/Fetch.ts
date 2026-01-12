export class Fetch
{
    static async fetchJSON<T>(apiEndpoint: string): Promise<T[]>
    {
        const response = await fetch(`http://127.0.0.1:8000/api/${apiEndpoint}`);
        if (!response.ok)
        {
            throw new Error(`Failed to fetch "${apiEndpoint}"`);
        }
        return await response.json() as T[];
    }
}