from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.fields import CharField

from my_profile.models import Profile, User, FollowUser


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'url', 'avatar', 'date_of_birth', 'user', 'cover', 'bio', 'permission')


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email', 'profile')

    def update(self, instance, validated_data):
        if 'profile' in validated_data:
            profile_data = validated_data.pop('profile')
            profile = instance.profile
            profile.bio = profile_data.get('bio', profile.bio)
            # profile.profession = profile_data.get('profession', profile.profession)
            profile.cover = profile_data.get('cover', profile.cover)
            profile.avatar = profile_data.get('avatar', profile.avatar)
            profile.save()
        return super(UserSerializer, self).update(instance, validated_data)


class UserSingUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')


"""
    Serializer data of the following relationship 
    for both users and followers
"""


class FollowProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'avatar', 'bio')


class UserBriefSerializer(serializers.ModelSerializer):
    profile = FollowProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'profile')


class FollowUserSerializer(serializers.ModelSerializer):
    follower = UserBriefSerializer(read_only=True)
    user = UserBriefSerializer(read_only=True)

    class Meta:
        model = FollowUser
        fields = ('id', 'user', 'follower')
        read_only_fields = ('id', 'user', 'follower')
