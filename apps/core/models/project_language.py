from django.db import models

from apps.core.models.language import Language
from apps.core.models.project import Project


class ProjectLanguage(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)

    class Meta:
        db_table = "project_language"
        unique_together = ("project", "language")

    def __str__(self):
        return f"{self.project} - {self.language}"