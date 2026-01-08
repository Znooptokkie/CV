from django.db import models


class Framework(models.Model):
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        db_table = "framework"

    def __str__(self):
        return self.name