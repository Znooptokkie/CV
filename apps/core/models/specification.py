from django.db import models


class SpecificationEnumCategory(models.TextChoices):
    SOFTWARE = "software", "Software"
    HARDWARE = "hardware", "Hardware"
    BACKEND = "backend", "Backend"
    FRONTEND = "frontend", "Frontend"
    PROTOCOL = "protocol", "Protocol"
    OTHER = "other", "Other"


class Specification(models.Model):
    specification = models.CharField(max_length=255, blank=True, null=True)
    category = models.CharField(max_length=20, choices=SpecificationEnumCategory.choices, default=SpecificationEnumCategory.SOFTWARE)

    class Meta:
        db_table = "specification"

    def __str__(self):
        return f"{self.specification} ({self.category})"
