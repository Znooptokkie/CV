from django.db import models


class Framework(models.Model):
    framework_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        db_table = "framework"

    def __str__(self):
        return self.name