import base64

from rest_framework import serializers

from deals.models import Request, Response, Payload


class PayloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payload
        fields = ('id', 'viewed', 'image', 'created_at', 'updated_at')


class ResponseSerializer(serializers.ModelSerializer):
    payload = PayloadSerializer()

    class Meta:
        model = Response
        fields = ('id', 'request', 'created_at',
                  'updated_at', 'payload', 'request')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def create(self, validated_data):
        payload_data = validated_data.pop('payload')
        payload = Payload.objects.create(**payload_data)

        return self.Meta.model.objects.create(payload=payload, **validated_data)


class RequestSerializer(serializers.ModelSerializer):
    payload = PayloadSerializer()
    response = ResponseSerializer(read_only=True)

    class Meta:
        model = Request
        fields = ('id', 'sender', 'recipient', 'description',
                  'created_at', 'updated_at', 'response', 'payload')
        read_only_fields = ('id', 'created_at', 'updated_at', 'response')

    def create(self, validated_data):
        payload_data = validated_data.pop('payload')
        payload = Payload.objects.create(**payload_data)

        return self.Meta.model.objects.create(payload=payload, **validated_data)
