from django.db import models

from .paragraph import Paragraph


class SubParagraph(models.Model):
    order = models.IntegerField(default=0)
    content = models.TextField()
    
    paragraph = models.ForeignKey(Paragraph, on_delete=models.CASCADE, related_name="subparagraphs")

    class Meta:
        db_table = "sub_paragraph"
        ordering = ["order"]

    def __str__(self):
        return f"{self.paragraph} - {self.order}"