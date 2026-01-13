from django.db import models

from apps.core.models.project import Project
from apps.core.models.specification import Specification


class ProjectSpecification(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="specifications_relation")
    specification = models.ForeignKey(Specification, on_delete=models.CASCADE)

    class Meta:
        db_table = "project_specification"
        unique_together = ("project", "specification")

    def __str__(self):
        return f"{self.project} - {self.specification}"