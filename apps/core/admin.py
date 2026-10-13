from django.contrib import admin
from django.utils.html import format_html

from apps.core.models.leetcode import (
    Leetcode,
    ProgrammingLanguage,
    LeetcodeFunction,
    LeetcodeMethod,
    LeetcodeOperator,
    LeetcodeDataStructure,
    LeetcodeControlStructure,
    LeetcodeAlgorithm,
)

@admin.register(ProgrammingLanguage)
class ProgrammingLanguageAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    search_fields = ("name", "slug")


@admin.register(Leetcode)
class LeetcodeAdmin(admin.ModelAdmin):
    list_display = (
        "problem_number",
        "problem_name",
        "language",
        "difficulty",
        "rating",
        "problem_link",
    )
    list_filter = ("difficulty", "language")
    search_fields = ("problem_name",)
    ordering = ("problem_number",)

    filter_horizontal = (
        "used_functions",
        "used_methods",
        "used_operators",
        "used_data_structures",
        "used_control_structures",
        "used_algorithms",
    )

    @admin.display(description="LeetCode")
    def problem_link(self, obj):
        if not obj.problem_url:
            return "-"

        return format_html(
            '<a href="{}" target="_blank" rel="noopener noreferrer">Open probleem</a>',
            obj.problem_url,
        )



@admin.register(LeetcodeFunction)
class LeetcodeFunctionAdmin(admin.ModelAdmin):
    list_display = ("name", "language")
    list_filter = ("language",)
    search_fields = ("name",)


@admin.register(LeetcodeMethod)
class LeetcodeMethodAdmin(admin.ModelAdmin):
    list_display = ("name", "language")
    list_filter = ("language",)
    search_fields = ("name",)


@admin.register(LeetcodeOperator)
class LeetcodeOperatorAdmin(admin.ModelAdmin):
    list_display = ("name", "language")
    list_filter = ("language",)
    search_fields = ("name",)


@admin.register(LeetcodeDataStructure)
class LeetcodeDataStructureAdmin(admin.ModelAdmin):
    list_display = ("name", "language")
    list_filter = ("language",)
    search_fields = ("name",)


@admin.register(LeetcodeControlStructure)
class LeetcodeControlStructureAdmin(admin.ModelAdmin):
    list_display = ("name", "language")
    list_filter = ("language",)
    search_fields = ("name",)


@admin.register(LeetcodeAlgorithm)
class LeetcodeAlgorithmAdmin(admin.ModelAdmin):
    list_display = ("name", "language")
    list_filter = ("language",)
    search_fields = ("name",)


# @admin.register(Leetcode)
# class LeetcodeAdmin(admin.ModelAdmin):
#     list_display = ("problem_name", "language", "difficulty", "rating")
#     list_filter = ("difficulty", "language")
#     search_fields = ("problem_name",)
#     filter_horizontal = (
#         "used_functions",
#         "used_methods",
#         "used_operators",
#         "used_data_structures",
#         "used_control_structures",
#         "used_algorithms",
#     )