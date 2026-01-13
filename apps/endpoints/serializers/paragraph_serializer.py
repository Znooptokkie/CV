from rest_framework import serializers

from apps.core.models.paragraph import Paragraph
from apps.endpoints.serializers.sub_paragraph_serializer import SubparagraphSerializer


class ParagraphSerializer(serializers.ModelSerializer):
    subparagraphs = SubparagraphSerializer(many=True, read_only=True)

    class Meta:
        model = Paragraph
        fields = [
            "order", 
            "title", 
            "subparagraphs"
        ]
