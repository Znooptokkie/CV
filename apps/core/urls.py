from django.urls import path

from .views import (
    index,
    komt_binnenkort,
    opleidingen,
    over_mij,
    project_detail,
    projecten,
)

urlpatterns = [
    path("", index, name="index"),
    path("opleidingen/", opleidingen, name="opleidingen"),
    path("projecten/", projecten, name="projecten"),
    path("projecten/<str:name>", project_detail, name="project_detail"),
    path("over-mij/", over_mij, name="over_mij"),
    path("komt-binnenkort/", komt_binnenkort, name="komt_binnenkort"),
]

