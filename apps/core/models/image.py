from django.db import models

from .project import Project


class Image(models.Model):
    image_url = models.CharField(max_length=255)
    alt_text = models.TextField(blank=True, null=True)
    is_main_image = models.BooleanField(default=False)
    is_logo = models.BooleanField(default=False)
    
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="images_relation")

    class Meta:
        db_table = "image"

    def __str__(self):
        return f"{self.alt_text}"
