from django.urls import path

from apps.endpoints.views.language_view import language_endpoint
from apps.endpoints.views.project_view import project_endpoint

urlpatterns = [
    path("languages/", language_endpoint, name="languages"),
    path("projects/", project_endpoint, name="projects")
]