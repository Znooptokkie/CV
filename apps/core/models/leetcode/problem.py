from django.db import models


class Leetcode(models.Model):

    class Languages(models.TextChoices):
        PYTHON = "python", "Python"
        PHP = "php", "PHP"
        JAVASCRIPT = "javascript", "JavaScript"
        TYPESCRIPT = "typescript", "TypeScript"

    class Difficulties(models.IntegerChoices):
        EASY = 1, "Easy"
        MEDIUM = 2, "Medium"
        HARD = 3, "Hard"

    problem_number = models.IntegerField(
        null=True,
        blank=True,
    )
    problem_name = models.CharField(max_length=200)
    problem_url = models.URLField(blank=True,)
    rating = models.IntegerField()

    difficulty = models.IntegerField(
        choices=Difficulties.choices,
        blank=True,
        null=True,
        default=Difficulties.EASY,
    )

    language = models.CharField(
        max_length=20,
        choices=Languages.choices,
        default=Languages.PYTHON,
    )

    runtime_ms = models.DecimalField(max_digits=5, decimal_places=2)
    runtime_perc = models.DecimalField(max_digits=5, decimal_places=2)
    memory_mb = models.DecimalField(max_digits=5, decimal_places=2)
    memory_perc = models.DecimalField(max_digits=5, decimal_places=2)
    code = models.TextField()

    used_functions = models.ManyToManyField(
        "core.LeetcodeFunction",
        blank=True,
        related_name="leetcode_problems",
    )

    used_methods = models.ManyToManyField(
        "core.LeetcodeMethod",
        blank=True,
        related_name="leetcode_problems",
    )

    used_operators = models.ManyToManyField(
        "core.LeetcodeOperator",
        blank=True,
        related_name="leetcode_problems",
    )

    used_data_structures = models.ManyToManyField(
        "core.LeetcodeDataStructure",
        blank=True,
        related_name="leetcode_problems",
    )

    used_control_structures = models.ManyToManyField(
        "core.LeetcodeControlStructure",
        blank=True,
        related_name="leetcode_problems",
    )

    used_algorithms = models.ManyToManyField(
        "core.LeetcodeAlgorithm",
        blank=True,
        related_name="leetcode_problems",
    )

    class Meta:
        db_table = "leetcode"

    def __str__(self):
        return self.problem_name