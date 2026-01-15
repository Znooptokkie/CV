export class Dropdown
{
    private dropdownMenuHTML: HTMLElement;
    private toggleButtonDropdownHTML: HTMLButtonElement;
    private headerHTML: HTMLElement;

    constructor()
    {
        this.dropdownMenuHTML = document.querySelector<HTMLElement>(".mobile-dropdown-menu")!;
        this.toggleButtonDropdownHTML = document.querySelector<HTMLButtonElement>(".nav-toggle-button")!;
        this.headerHTML = document.querySelector<HTMLElement>("header")!;
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    toggleDropdown(): void
    {
        if (this.dropdownMenuHTML && this.headerHTML && this.toggleButtonDropdownHTML)
        {
            const isOpen = this.dropdownMenuHTML.style.display === "block";

            this.dropdownMenuHTML.style.display = isOpen ? "none" : "block";

            if (isOpen)
            {
                this.headerHTML.classList.remove("dropdown-active")
            }
            else
            {
                this.headerHTML.classList.add("dropdown-active");
            }
        }
    }

    checkForButton(): void
    {
        if (this.toggleButtonDropdownHTML) 
        {
            this.toggleButtonDropdownHTML.addEventListener("click", this.toggleDropdown);
        }
    }
}