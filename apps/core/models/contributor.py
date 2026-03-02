from django.db import models


class Contributor(models.Model):
    name = models.CharField(max_length=50, unique=True)
    git_url = models.CharField(max_length=255, unique=False, null=True)
    git_image = models.CharField(max_length=255, unique=False, null=True)

    class Meta:
        db_table = "contributor"

    def __str__(self):
        return self.name