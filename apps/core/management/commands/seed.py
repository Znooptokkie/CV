from django.core.management.base import BaseCommand
from apps.core.models.project import Project
from apps.core.models.framework import Framework
from apps.core.models.language import Language
from apps.core.models.image import Image
from apps.core.models.paragraph import Paragraph
from apps.core.models.sub_paragraph import SubParagraph
from apps.core.models.specification import Specification

class Command(BaseCommand):
    help = "Reset and Seed core data"

    def handle(self, *args, **options):
        try:
            # =================
            # DELETE ALL
            # =================
            SubParagraph.objects.all().delete()
            Paragraph.objects.all().delete()
            Specification.objects.all().delete()
            Image.objects.all().delete()
            # Koppeltabel wordt verwijderd via Project delete
            Project.objects.all().delete()
            Framework.objects.all().delete()
            Language.objects.all().delete()

            self.stdout.write(self.style.SUCCESS("Alle data correct verwijderd!"))

            # =================
            # FRAMEWORKS
            # =================
            frameworks = [
                "Django",
                "Flask",
                "React Native",
                "Android Studio",
                "Electron",
            ]
            for name in frameworks:
                Framework.objects.get_or_create(name=name)

            # =================
            # LANGUAGES
            # =================
            language_objs = {}
            languages = [
                "Python", "MicroPython", "JavaScript", "TypeScript",
                "PHP", "Java", "HTML", "CSS", "SASS", "Bash", "SQL"
            ]
            for name in languages:
                language_objs[name], _ = Language.objects.get_or_create(name=name)

            # =================
            # PROJECTS DATA
            # =================
            projects_data = [
                {
                    "link": "battlebot",
                    "title": "Battlebot",
                    "description": "Battlebot was mijn eindstage die ik samen met een klasgenoot, Matthijs de Graaf, heb volbracht op school.",
                    "year": 2025,
                    "github": "https://github.com/BattlebotdeGripper/battlebot_pi",
                    "featured": True,
                    "in_progress": False,
                    "languages": ["Python", "MicroPython", "Bash"],
                    "images": [
                        {"image_url": "projects/battlebot/battlebot-logo.png", "alt_text": "Logo van Battlebot project", "is_main_image": False, "is_logo": True},
                        {"image_url": "projects/battlebot/battlebot_frontview.webp", "alt_text": "Vooraanzicht van de Battlebot", "is_main_image": False,  "is_logo": False},
                        {"image_url": "projects/battlebot/battlebot_huge_mess_topview.webp", "alt_text": "Bovenaanzicht van de Battlebot", "is_main_image": False, "is_logo": False},
                        {"image_url": "projects/battlebot/battleobt_huge_mess.webp", "alt_text": "Enorme bende op de Battlebot", "is_main_image": True,  "is_logo": False},
                        {"image_url": "projects/battlebot/battlebot_mcp_connection.webp", "alt_text": "De MCP2515-module connectie tussen beide Pi's", "is_main_image": True, "is_logo": False},
                        {"image_url": "projects/battlebot/battlebot_myself.webp", "alt_text": "Selfie van mij met de Battlebot", "is_main_image": False, "is_logo": False},
                        {"image_url": "projects/battlebot/battlebot_screen_picture.webp", "alt_text": "Foto van de Battlebot met de camera van de robot", "is_main_image": False, "is_logo": False},
                        {"image_url": "projects/battlebot/battlebot_selfmade_module_topview.webp", "alt_text": "Bovenaanzicht hardware zelf gemaakt hardware module", "is_main_image": True, "is_logo": False},
                        {"image_url": "projects/battlebot/battlebot_selfmade_module.webp", "alt_text": "Zelfgemaakte hardware module", "is_main_image": False, "is_logo": False},
                        {"image_url": "projects/battlebot/battlebot_sideview.webp", "alt_text": "Zijaanzicht van de Battlebot", "is_main_image": False, "is_logo": False},
                        {"image_url": "projects/battlebot/battlebot_view_top.webp", "alt_text": "Bovenaanzicht van de Battlebot", "is_main_image": False, "is_logo": False},
                        {"image_url": "projects/battlebot/battlebot_all_components_blueprint.webp", "alt_text": "Blueprint van alle geimplementeerde hardware componenten", "is_main_image": False,"is_logo": False},
                        {"image_url": "projects/battlebot/battlebot_circuit_blueprint.webp", "alt_text": "Blueprint voornamelijk elektrisch circuit", "is_main_image": False, "is_logo": False},
                    ],
                    "paragraphs": [
                        {
                            "order": 1,
                            "title": "Introductie",
                            "subparagraphs": [
                                "Battlebot was een eindstageproject waarin een bestaande robot werd omgevormd tot een intelligent en grotendeels autonoom systeem.",
                                "Het doel was niet alleen een werkende robot bouwen, maar ook diepgaand inzicht krijgen in hoe complexe systemen samenwerken.",
                                "Gedurende vier maanden werd de robot stap voor stap uitgebreid, getest en geoptimaliseerd."
                            ]
                        },
                        {
                            "order": 2,
                            "title": "Visie en Doelstelling",
                            "subparagraphs": [
                                "De kern van het project was het realiseren van een robot die zowel handmatig als autonoom kan functioneren.",
                                "Dit duale besturingssysteem combineert directe controle met zelfstandige intelligentie.",
                                "De autonome functionaliteit richtte zich op objectherkenning en bewegingsplanning."
                            ]
                        },
                        {
                            "order": 3,
                            "title": "Architecturale opzet",
                            "subparagraphs": [
                                "Vanaf het begin werd gekozen voor een gescheiden architectuur, waarbij verantwoordelijkheden duidelijk werden verdeeld tussen software en hardware. Dit verhoogde onderhoudbaarheid en maakte testen eenvoudiger.",
                                "De Raspberry Pi 5 fungeerde als centrale besturingshub voor logica, communicatie, AI-verwerking en beslissingsalgoritmen.",
                                "De Raspberry Pi Pico 2 verzorgde real-time aansturing van motoren en de grijparm, waardoor lage-latentie acties betrouwbaar konden worden uitgevoerd, onafhankelijk van de zwaardere verwerking op de Pi 5."
                            ]
                        },
                        {
                            "order": 4,
                            "title": "Besturing en Veiligheid",
                            "subparagraphs": [
                                "De robot wordt primair bestuurd via een RC-controller, waarvan signalen worden ingelezen door de Raspberry Pi 5.",
                                "Deze signalen worden gevalideerd en geïnterpreteerd, waarna ze worden doorgestuurd naar de Raspberry Pi Pico 2 voor fysieke aansturing van motoren en actuators.",
                                "EOm veiligheid te waarborgen is een heartbeat-mechanisme geïmplementeerd, dat continu controleert of de communicatie tussen Pi 5 en Pico 2 intact is en bij verlies van verbinding de robot in een veilige staat zet."
                            ]
                        },
                        {
                            "order": 5,
                            "title": "Overgang naar Autonome Besturing",
                            "subparagraphs": [
                                "Nadat de handmatige besturing stabiel functioneerde, verschoof de focus naar autonome aansturing. Hiervoor werd een camerasysteem toegevoegd waarmee de robot zijn omgeving kan waarnemen en visuele data kan verzamelen voor objectdetectie.",
                                "Door visuele input te combineren met afstandsmetingen van sensoren kon de robot objecten detecteren, volgen en ermee interacteren, zoals het oppakken of ontwijken van obstakels."
                            ]
                        },
                        {
                            "order": 6,
                            "title": "Hardwarekeuze en Onderbouwing",
                            "subparagraphs": [
                                "De keuze voor de Raspberry Pi 5 was gebaseerd op de behoefte aan rekenkracht, uitbreidbaarheid en ondersteuning voor AI-frameworks. De Raspberry Pi Pico 2 werd ingezet voor real-time besturing vanwege de directe GPIO-aansturing en voorspelbare timing.",
                                "Deze combinatie resulteerde in een schaalbaar systeem waarin software en hardware logisch van elkaar gescheiden zijn, waardoor complexe taken betrouwbaar uitgevoerd kunnen worden."
                            ]
                        },
                        {
                            "order": 7,
                            "title": "Communicatie via CAN-bus",
                            "subparagraphs": [
                                "Voor communicatie tussen Raspberry Pi 5 en Pico 2 is gekozen voor het CAN-bus protocol, bekend om zijn betrouwbaarheid en fouttolerantie. De MCP2515-modules verzorgen de interface, waardoor berichten met verschillende prioriteiten veilig verzonden kunnen worden.",
                                "Hoewel de implementatie complex was, bood het waardevolle inzichten in industriële communicatieprotocollen en message-prioritization technieken."
                            ]
                        },
                        {
                            "order": 8,
                            "title": "RC-Receiver Integratie",
                            "subparagraphs": [
                                "De Flysky FS-iA10B receiver vormt de schakel tussen gebruiker en robot, waarbij RC-signalen worden ontvangen en verwerkt. De signalen worden via UART omgezet naar digitale besturingswaarden die de Pi 5 kan interpreteren en doorsturen naar de Pico 2. Failsafe-functionaliteit zorgt ervoor dat de robot automatisch stopt of in een veilige modus komt bij signaalverlies of foutieve inputs."
                            ]
                        },
                        {
                            "order": 9,
                            "title": "Sensoren als Ondersteuning",
                            "subparagraphs": [
                                "Extra sensoren werden toegevoegd voor betrouwbaardere besturing, vooral tijdens autonome navigatie. Ultrasone afstandssensoren leveren realtime data over de omgeving, wat cruciaal is voor obstakelvermijding en positionering van de grijparm. Deze sensoren ondersteunen zowel autonome navigatie als het nauwkeurig uitvoeren van fysieke taken.",
                                "Om rijprecisie te verbeteren zijn optische encoders en odometrie onderzocht. Hoewel deze technieken theoretisch nauwkeurige resultaten opleverden, bleken ze in de praktijk gevoelig voor mechanische afwijkingen en oppervlakteruis. Uiteindelijk is gekozen voor een eenvoudiger correctiemechanisme op basis van PWM-aansturing, dat betrouwbaarder en onderhoudsvriendelijker bleek."
                            ]
                        },
                        {
                            "order": 10,
                            "title": "AI-Verwerking aan de Edge",
                            "subparagraphs": [
                                "Real-time objectdetectie werd uitgevoerd met de Hailo-8 AI Accelerator, die beelden lokaal verwerkt zonder externe afhankelijkheid. De accelerator maakt het mogelijk zware AI-modellen snel en efficiënt uit te voeren, wat cruciaal is voor autonome beslissingen. Dankzij deze setup kan de robot zelfstandig objecten herkennen en acties uitvoeren op basis van lokaal verwerkte data."
                            ]
                        },
                        {
                            "order": 11,
                            "title": "Visie en Cameragebruik",
                            "subparagraphs": [
                                "De Camera Module 3 Wide NoIR werd gekozen vanwege het brede gezichtsveld en de goede prestaties bij weinig licht. Beelden worden direct naar de Hailo-8 gestuurd voor analyse, waardoor realtime objectdetectie mogelijk is. Aanpassingen aan autofocus en aanvullende sensoren verbeterden de nauwkeurigheid bij korte afstand en complexe interacties."
                            ]
                        },
                        {
                            "order": 12,
                            "title": "Softwarearchitectuur",
                            "subparagraphs": [
                                "De software op de Raspberry Pi 5 is volledig geschreven in Python, met nadruk op leesbaarheid, onderhoudbaarheid en objectgeoriënteerd ontwerp. Op de Raspberry Pi Pico 2 draait MicroPython, waarmee directe hardware-aansturing mogelijk is met lage latentie. Versiebeheer via GitHub zorgt voor traceerbaarheid van wijzigingen, samenwerking en reproduceerbaarheid van experimenten."
                            ]
                        },
                        {
                            "order": 13,
                            "title": "Projectverloop en Iteratie",
                            "subparagraphs": [
                                "Het project volgde een iteratief proces, waarbij ontwerpen regelmatig werden herzien op basis van testresultaten en observaties. Problemen met voeding, communicatie en mechanica leidden tot meerdere herontwerpen, wat het systeem uiteindelijk robuuster maakte. Deze iteraties leverden diepgaand inzicht in systeemintegratie, foutafhandeling en praktische engineering-vaardigheden."
                            ]
                        },
                        {
                            "order": 14,
                            "title": "Eindresultaat en Reflectie",
                            "subparagraphs": [
                                "Het eindresultaat is een robot die stabiel handmatig bestuurbaar is en gedeeltelijk autonoom kan functioneren. Hoewel niet alle doelen volledig zijn gerealiseerd, biedt het project een solide basis voor verdere uitbreiding en verbetering. De belangrijkste opbrengst is kennis over embedded systemen, AI, communicatieprotocollen en de integratie van complexe software-hardware-systemen."
                            ]
                        },
                    ],
                    "specifications": [
                        {"spec": "UART (Universal asynchronous receiver-transmitter)", "category": "PROTOCOL"},
                        {"spec": "CAN (Controller area network)", "category": "PROTOCOL"},
                        {"spec": "I-Bus", "category": "PROTOCOL"},
                        {"spec": "SPI (Serial Peripheral Interface)", "category": "PROTOCOL"},
                        {"spec": "SSH (Secure Shell)", "category": "PROTOCOL"},
                        {"spec": "Raspberry Pi 5", "category": "HARDWARE"},
                        {"spec": "Hailo-HAT", "category": "HARDWARE"},
                        {"spec": "Raspberry Pi Pico 2", "category": "HARDWARE"},
                        {"spec": "UBEC (Universal battery eliminator circuit)", "category": "HARDWARE"},
                        {"spec": "ESC (Electronic Speed Controller)", "category": "HARDWARE"},
                        {"spec": "MCP2515-module", "category": "HARDWARE"},
                        {"spec": "DC-Converter", "category": "HARDWARE"},
                        {"spec": "FC-03 IR Optical Encoder", "category": "HARDWARE"},
                        {'spec': "CSI (Camera Serial Interface)", "category": "HARDWARE"},
                        {"spec": "HC-SR04", "category": "HARDWARE"},
                        {"spec": "Bitwise Operators", "category": "SOFTWARE"},
                        {"spec": "Thonny", "category": "SOFTWARE"},
                        {"spec": "YOLOv11", "category": "SOFTWARE"},
                        {"spec": "Crontab", "category": "SOFTWARE"},
                        {"spec": "PWM (Pulse-width modulation)", "category": "OTHER"},
                    ]
                }
            ]

            # =================
            # HELPER FUNCTIES
            # =================
            def create_paragraphs(project, paragraphs):
                for p in paragraphs:
                    para_obj = Paragraph.objects.update_or_create(
                        project=project,
                        order=p["order"],
                        defaults={"title": p["title"]}
                    )[0]
                    for i, sub in enumerate(p["subparagraphs"], start=1):
                        SubParagraph.objects.update_or_create(
                            paragraph=para_obj,
                            order=i,
                            defaults={"content": sub}
                        )

            # =================
            # LOOP PROJECTS
            # =================
            for project_data in projects_data:
                proj, _ = Project.objects.update_or_create(
                    link=project_data["link"],
                    defaults={
                        "title": project_data["title"],
                        "description": project_data["description"],
                        "year": project_data["year"],
                        "github": project_data["github"],
                        "featured": project_data["featured"],
                        "in_progress": project_data["in_progress"],
                    }
                )

                # Koppeltabel: languages
                for lang_name in project_data.get("languages", []):
                    proj.projectlanguage_set.get_or_create(language=language_objs[lang_name])

                # Images
                for img in project_data.get("images", []):
                    Image.objects.update_or_create(
                        project=proj,
                        image_url=img["image_url"],
                        defaults={"alt_text": img["alt_text"], "is_main_image": img["is_main_image"], "is_logo": img["is_logo"]},
                    )

                # Paragraphs & subparagraphs
                create_paragraphs(proj, project_data.get("paragraphs", []))

                # Specifications
                for spec in project_data.get("specifications", []):
                    Specification.objects.update_or_create(
                        project=proj,
                        specification=spec["spec"],
                        defaults={"category": spec["category"]}
                    )

            self.stdout.write(self.style.SUCCESS("Seed core data succesvol uitgevoerd!"))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Seed mislukt: {e}"))
