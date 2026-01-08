from django.db import models


class Project(models.Model):
    project_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=120)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    link = models.CharField(max_length=255, blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    datetime = models.DateTimeField(auto_now_add=True)
    excerpt = models.TextField(blank=True, null=True)
    github = models.CharField(max_length=255, blank=True, null=True)
    featured = models.BooleanField(default=False)
    in_progress = models.BooleanField(default=False)

    class Meta:
        db_table = "project"

    def __str__(self):
        return self.title