from django.db import models


class LeetcodeFunction(models.Model):
    language = models.ForeignKey(
        "core.ProgrammingLanguage",
        on_delete=models.CASCADE,
        related_name="functions",
    )
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["language", "name"],
                name="unique_function_per_language",
            ),
        ]

    def __str__(self):
        return f"{self.language.slug}: {self.name}"