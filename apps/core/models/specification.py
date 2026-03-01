from django.db import models


class SpecificationEnumCategory(models.TextChoices):
    SOFTWARE = "software", "Software"
    HARDWARE = "hardware", "Hardware"
    COMMUNICATIE = "communicatie", "Communicatie"
    PROTOCOL = "protocol", "Protocol"
    SENSOR = "sensor", "Sensor"
    BEVEILIGING = "beveiliging", "beveiliging"
    INTERFACE = "interface", "Interface"
    DATAFORMAT = "dataformat", "Dataformat"
    OTHER = "other", "Other"


class Specification(models.Model):
    specification = models.CharField(max_length=255, blank=True, null=True)
    category = models.CharField(max_length=20, choices=SpecificationEnumCategory.choices, default=SpecificationEnumCategory.OTHER)
    svg_url = models.CharField(max_length=255, unique=False, null=True)

    class Meta:
        db_table = "specification"

    def __str__(self):
        return f"{self.specification} ({self.category})"
