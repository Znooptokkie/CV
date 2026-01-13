from django.db import models

from apps.core.models.framework import Framework
from apps.core.models.project import Project


class ProjectFramework(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="frameworks_relation")
    framework = models.ForeignKey(Framework, on_delete=models.CASCADE)

    class Meta:
        db_table = "project_framework"
        unique_together = ("project", "framework")

    def __str__(self):
        return f"{self.project} - {self.framework}"