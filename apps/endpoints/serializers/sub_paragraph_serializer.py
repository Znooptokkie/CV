from rest_framework import serializers

from apps.core.models.sub_paragraph import SubParagraph


class SubparagraphSerializer(serializers.ModelSerializer):

    class Meta:
        model = SubParagraph
        fields = [
            "order", 
            "content"
        ]
