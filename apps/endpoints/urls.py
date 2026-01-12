from django.urls import path

from apps.endpoints.views.language_view import language_endpoint

urlpatterns = [
    path("languages/", language_endpoint, name="languages"),
]