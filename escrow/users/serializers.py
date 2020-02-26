from django.core import exceptions
from rest_framework import serializers
from users.models import User
import django.contrib.auth.password_validation as validators


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True, required=False)
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'username',
                  'password', 'password_confirmation',)
        read_only_fields = ('id',)

    @staticmethod
    def _get_user_data(data):
        user_data = dict()
        keys = ('email', 'first_name', 'last_name', 'username', 'password',)

        for key in keys:
            value = data.get(key)

            if value is not None:
                user_data[key] = value

        return user_data

    def _validate_password(self, data):
        password = data.get('password')

        if password is None:
            return

        user_data = self._get_user_data(data)
        user = User(**user_data)
        errors = dict()

        try:
            validators.validate_password(password=password, user=user)
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)

    def validate(self, data):
        if data.get('password') != data.get('password_confirmation'):
            errors = dict(password_confirmation=[
                          "Password and password confirmation do not match."])
            raise serializers.ValidationError(errors)

        self._validate_password(data)

        return data

    def create(self, validated_data):
        user_data = self._get_user_data(validated_data)
        user = User.objects.create_user(**user_data)
        user.save()

        return user

    def update(self, instance, validated_data):
        user_data = self._get_user_data(validated_data)
        password = user_data.pop('password', None)

        if password is not None:
            instance.set_password(password)

        for key, value in user_data.items():
            setattr(instance, key, value)

        instance.save()

        return instance
