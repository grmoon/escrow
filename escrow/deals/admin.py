from django.contrib import admin

from deals.models import Request, Response, Payload


@admin.register(Request)
class RequestAdmin(admin.ModelAdmin):
    pass


@admin.register(Response)
class ResponseAdmin(admin.ModelAdmin):
    pass


@admin.register(Payload)
class PayloadAdmin(admin.ModelAdmin):
    pass
