from django.urls import path

from apps.endpoints.views.language_view import language_endpoint
from apps.endpoints.views.project_view import project_endpoint
from apps.endpoints.views.projects_view import projects_endpoint

urlpatterns = [
    path("languages/", language_endpoint, name="languages"),
    path("projects/", projects_endpoint, name="projects"),
    path("project/<str:project_link>/", project_endpoint, name="project")
]