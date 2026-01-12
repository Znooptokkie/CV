import { LanguageInterface } from "../interfaces/LanguageInterface.js";
import { Fetch } from "./core/Fetch.js";
import { LanguageFilter } from "./filters/LanguageFilter.js";

export async function initEndpoints()
{
    // const lanf = LanguageFilter.filterItems()
    const languages = await Fetch.fetchJSON<LanguageInterface>("languages");
    console.log(languages);
    // languages.map(prop => prop.name === "SQL" ? prop.name = "HOI" : "DOEI")
}