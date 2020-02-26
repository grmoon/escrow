from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from django_filters import FilterSet, OrderingFilter

from users.models import User
from users.serializers import UserSerializer


class UserFilter(FilterSet):
    order = OrderingFilter(
        fields=(
            ('created_at', 'created_at'),
            ('username', 'username'),
        ),
    )

    class Meta:
        model = User
        fields = {
            'username': ('icontains',)
        }


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filterset_class = UserFilter

    @action(detail=False, methods=['get'])
    def self(self, request):
        data = UserSerializer(request.user).data

        return Response(data)

    def get_permissions(self, *args, **kwargs):
        permission_classes = {
            'self': (IsAuthenticated,),
            'list': (IsAuthenticated,)
        }.get(self.action, ())

        return [permission() for permission in permission_classes]
