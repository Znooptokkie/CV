from rest_framework.decorators import api_view
from rest_framework.response import Response

from apps.core.models.language import Language
from apps.endpoints.serializers.language_ep import LanguageSerializer


@api_view(["GET"])
def language_endpoint(request):
    query = Language.objects.all()
    serializer = LanguageSerializer(query, many=True)
    return Response(serializer.data)