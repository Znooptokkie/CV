# apps/core/models/project_paragraph.py
from django.db import models

from .project import Project


class Paragraph(models.Model):
    order = models.IntegerField(default=0)
    title = models.CharField(max_length=255, blank=True, null=True)

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="paragraphs")

    class Meta:
        db_table = "paragraph"

    def __str__(self):
        return f"{self.project.title} - {self.title or 'Paragraph'}"
