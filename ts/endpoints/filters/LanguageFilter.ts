import { LanguageInterface } from "../../interfaces/LanguageInterface";
import { Fetch } from "../core/Fetch";

export class LanguageFilter
{
    private static readonly filteredItems: Array<string> = ["MicroPython", "HTML", "CSS"]

    // public static async filterItems(): Promise<LanguageInterface[]>
    // {
    //         const languages = await Fetch.fetchJSON<LanguageInterface>("languages");
    //         return languages.filter(row => !this.filteredItems.includes(row.name))
    // } 
}