import { Background } from "./utils/Background.js";
import { Dropdown } from "./utils/NavDropdown.js";
import { initEndpoints } from "./endpoints/initEndpoints.js";

new Background("stars", 50)
const navDropdown = new Dropdown();

initEndpoints();

document.addEventListener("DOMContentLoaded", () => 
{
    navDropdown.checkForButton()
})