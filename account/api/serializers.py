from rest_framework import serializers
from account.models import Profile, User
# from rest_auth.models import TokenModel


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email')


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


# class TokenSerializer(serializers.ModelSerializer):
#     user = UserSerializer()
#
#     class Meta:
#         model = TokenModel
#         fields = ('key', 'user')
