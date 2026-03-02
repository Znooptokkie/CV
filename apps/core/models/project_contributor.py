from django.db import models

from apps.core.models.contributor import Contributor
from apps.core.models.project import Project


class ProjectContributor(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="contributors_relation")
    contributor = models.ForeignKey(Contributor, on_delete=models.CASCADE)

    class Meta:
        db_table = "project_contributor"
        unique_together = ("project", "contributor")

    def __str__(self):
        return f"{self.project} - {self.contributor}"