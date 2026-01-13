from rest_framework.decorators import api_view
from rest_framework.response import Response

from apps.core.models.project import Project
from apps.endpoints.serializers.project_serializer import ProjectSerializer


@api_view(["GET"])
def projects_endpoint(request):
    query = Project.objects.all()
    serializer = ProjectSerializer(query, many=True)
    return Response(serializer.data)