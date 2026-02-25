import { ProjectType } from "../../../types/projects.type.js"
import { ProjectSpecificationFactory } from "./ProjectSpecificationFactory.js"

export function specInit(projectData: ProjectType)
{
    const specNames = [
    "Hardware", // fysieke componenten (printplaten, controllers, drivers)
    "Software", // applicaties, backend, frontend
    "Communicatie", // CAN, I2C, SPI, UART, netwerk
    "Protocol", // berichtstructuur, datadefinitie, encoding
    "Sensor",
    "Beveiliging", // encryptie, authenticatie, noodstop, failsafe, fysieke risico’s
    "Interface", // UI, API, fysieke bediening
    "Compliance" // Normering
]

    const specInstance = new ProjectSpecificationFactory(specNames, "project-detail-section-specification", projectData)
    specInstance.createEachSpecification()
}