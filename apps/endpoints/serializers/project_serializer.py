from rest_framework import serializers

from apps.core.models.project import Project
from apps.endpoints.serializers.image_serializer import ImageSerializer
from apps.endpoints.serializers.paragraph_serializer import ParagraphSerializer


class ProjectSerializer(serializers.ModelSerializer):
    languages = serializers.SerializerMethodField() # Get the representation from "get_languages" method
    frameworks = serializers.SerializerMethodField() # Get the representation from "get_frameworks" method
    specifications = serializers.SerializerMethodField() # Get the representation from "get_specifications" method
    images = ImageSerializer(source="images_relation", many=True, read_only=True) # images_relatiom -> Image Model
    paragraphs = ParagraphSerializer(source="paragraphs_relation", many=True, read_only=True) # paragraphs_relation -> Paragraph Model

    class Meta:
        model = Project
        fields = [
            "id", 
            "title", 
            "subtitle", 
            "description", 
            "link",
            "year", 
            "datetime", 
            "excerpt", 
            "github",
            "featured", 
            "in_progress", 
            "languages",
            "frameworks",
            "images",
            "specifications",
            "paragraphs"
        ]

    # Get only the data. Not setting key in JSON!
    def get_languages(self, obj):
        return [lang.language.name for lang in obj.languages_relation.all()]

    def get_frameworks(self, obj):
        return [frame.framework.name for frame in obj.frameworks_relation.all()]

    def get_specifications(self, obj):
        return [ spec.specification.specification for spec in obj.specifications_relation.all()]
