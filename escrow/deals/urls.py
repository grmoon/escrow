from django.urls import path, include

from rest_framework.routers import DefaultRouter

from deals.views import RequestViewSet, ResponseViewSet


router = DefaultRouter()
router.register('requests', RequestViewSet, basename='request')
router.register('responses', ResponseViewSet, basename='response')

urlpatterns = [
    path('v1/', include(router.urls))
]
