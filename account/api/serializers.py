from rest_framework import serializers
from account.models import Profile, User


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'url', 'photo', 'date_of_birth', 'user')


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer

    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'profile')
