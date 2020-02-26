from django.db import models

from shared.models import BaseModel
from django.core.validators import MinValueValidator, MaxValueValidator


class Payload(BaseModel):
    image = models.ImageField(upload_to='images')
    viewed = models.BooleanField(default=False)

    def __str__(self):
        return str(self.image)


class Response(BaseModel):
    payload = models.OneToOneField(
        "deals.Payload", on_delete=models.CASCADE)
    request = models.OneToOneField("deals.Request", on_delete=models.CASCADE)


class Request(BaseModel):
    sender = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name='outbound_requests')
    recipient = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name='inbound_requests')
    description = models.CharField(max_length=50)
    payload = models.OneToOneField(
        "deals.Payload", on_delete=models.CASCADE)

    def __str__(self):
        return self.description


class Review(BaseModel):
    request = models.ForeignKey("deals.Request", on_delete=models.CASCADE)
    fidelity = models.BooleanField(default=True)
    quality = models.PositiveSmallIntegerField(validators=[
        MinValueValidator(1),
        MaxValueValidator(5)
    ])
    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name='reviews')
