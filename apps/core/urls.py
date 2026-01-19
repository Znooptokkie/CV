from django.urls import path

from .views import (
    index,
    internal_server_error,
    komt_binnenkort,
    opleidingen,
    over_mij,
    page_not_found,
    projecten,
    too_many_requests,
)

urlpatterns = [
    path("", index, name="index"),
    path("opleidingen/", opleidingen, name="opleidingen"),
    path("projecten/", projecten, name="projecten"),
    path("over-mij/", over_mij, name="over_mij"),
    path("komt-binnenkort/", komt_binnenkort, name="komt_binnenkort"),
    path("niet-gevonden/", page_not_found, name="page_not_found"),
    path("veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeelste-veel-request/", too_many_requests, name="too_many_requests"),
    path("internal-server-error/", internal_server_error, name="internal_server_error")
]