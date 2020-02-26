import base64
from uuid import uuid4

from django.db.models import Q
from django.core.files.base import ContentFile

from django_filters import FilterSet, OrderingFilter

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response as DRFResponse

from deals.models import Request, Response
from deals.serializers import RequestSerializer, ResponseSerializer, PayloadSerializer


class RequestFilter(FilterSet):
    order = OrderingFilter(
        fields=(
            ('created_at', 'created_at'),
        ),
    )

    class Meta:
        model = Request
        fields = ('recipient', 'sender')


class RequestViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = RequestSerializer
    payload_serializer_class = PayloadSerializer
    filterset_class = RequestFilter

    def get_queryset(self):
        query_filter = Q(recipient=self.request.user) | Q(
            sender=self.request.user)

        return Request.objects.filter(query_filter)

    def create(self, request):
        imgstr = request.POST['payload']
        payload = ContentFile(base64.b64decode(imgstr),
                              name='{}.jpg'.format(uuid4()))

        serializer = self.serializer_class(data={
            'description': request.POST['description'],
            'sender': request.user.id,
            'payload': {
                'image': payload
            },
            'recipient': request.POST['recipient'],
        })

        if serializer.is_valid():
            serializer.save()
            resp_data = serializer.data
            return DRFResponse(resp_data)
        else:
            print(serializer.errors)
            return DRFResponse(serializer.errors)


class ResponseViewSet(viewsets.ModelViewSet):
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer

    def create(self, request):
        imgstr = request.POST['payload']
        payload = ContentFile(base64.b64decode(imgstr),
                              name='{}.jpg'.format(uuid4()))

        serializer = self.serializer_class(data={
            'request': request.POST['request'],
            'payload': {
                'image': payload
            }
        })

        if serializer.is_valid():
            serializer.save()
            resp_data = serializer.data
            return DRFResponse(resp_data)
        else:
            return DRFResponse(serializer.errors)
