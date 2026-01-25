from django.urls import path

from .views import (
    index,
    komt_binnenkort,
    opleidingen,
    over_mij,
    projecten,
)

urlpatterns = [
    path("", index, name="index"),
    path("opleidingen/", opleidingen, name="opleidingen"),
    path("projecten/", projecten, name="projecten"),
    path("over-mij/", over_mij, name="over_mij"),
    path("komt-binnenkort/", komt_binnenkort, name="komt_binnenkort"),
]

