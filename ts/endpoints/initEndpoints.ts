import { LanguageService } from "./service/LanguageService.js";

export async function initEndpoints()
{
    const languages = await LanguageService.filterItems()
    // console.log(languages);
}