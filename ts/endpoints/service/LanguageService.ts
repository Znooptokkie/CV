import { LanguageInterface } from "../../interfaces/LanguageInterface";
import { Fetch } from "../utils/Fetch.js";

export class LanguageService
{
    private static readonly filteredItems: Array<string> = ["MicroPython", "HTML", "CSS"]

    public static async filterItems(): Promise<LanguageInterface[]>
    {
        const languages = await Fetch.fetchJSON<LanguageInterface>("languages");
        return languages.filter(row => !this.filteredItems.includes(row.name))
    } 
}