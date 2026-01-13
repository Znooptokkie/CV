from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from apps.core.models.project import Project
from apps.endpoints.serializers.project_serializer import ProjectSerializer


@api_view(["GET"])
def project_endpoint(request, project_link):
    project = get_object_or_404(Project, link=project_link)
    serializer = ProjectSerializer(project)
    return Response(serializer.data)
