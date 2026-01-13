from rest_framework import serializers

from apps.core.models.image import Image


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = [
            "image_url",
            "alt_text",
            "is_main_image",
            "is_logo"
        ]