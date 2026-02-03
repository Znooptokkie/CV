export class Fetch
{
    static async fetchList<T>(endpoint: string): Promise<T[]>
    {
        const response = await fetch(`/api/${endpoint}`)
        
        if (!response.ok) 
            throw new Error(endpoint)
        
        return response.json() as Promise<T[]>
    }

    static async fetchDetail<T>(endpoint: string): Promise<T>
    {
        const response= await fetch(`/api/${endpoint}`)
        
        if (!response.ok) 
            throw new Error(endpoint)
        
        return response.json() as Promise<T>
    }
}