from django.contrib.auth.models import AbstractUser

from shared.models import BaseModel


class User(AbstractUser, BaseModel):
    pass
