from django.db import models


class Language(models.Model):
    language_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)
    svg_url = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = "language"

    def __str__(self):
        return self.name