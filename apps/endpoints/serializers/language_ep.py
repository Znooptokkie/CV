from rest_framework import serializers
from apps.core.models.language import Language

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ["id", "name", "svg_url"]
