from django.core import exceptions
from rest_framework import permissions, status, serializers
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView, get_object_or_404
import django.contrib.auth.password_validation as validators
from my_profile.api.serializers import UserSerializer, ProfileSerializer, UserSingUpSerializer
from my_profile.models import Profile, User


class UserView(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileView(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


# user apply editor permission
@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def apply_editor_permission(request, pk):
    user = User.objects.get(id=request.user.id)
    user.profile.permission = 'reviewing'
    user.profile.save()
    return Response(status=status.HTTP_201_CREATED)


# user cancel apply media permission
@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def cancel_apply_editor_permission(request, pk):
    user = User.objects.get(id=request.user.id)
    user.profile.permission = 'unreviewed'
    user.profile.save()
    return Response(status=status.HTTP_201_CREATED)


# Validate duplicate username
@api_view(['GET'])
def validate_username(request, username):
    queryset = get_object_or_404(User, username=username)
    serializer = UserSingUpSerializer(queryset)
    if serializer:
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


# Validate duplicate email address
@api_view(['GET'])
def validate_email(request, email):
    queryset = get_object_or_404(email=email)
    serializer = UserSingUpSerializer(queryset)
    if serializer:
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


# Validate duplicate password
@api_view(['GET'])
def validate_password(request, password):
    errors = dict()
    try:
        # validate the password and catch the exception
        validators.validate_password(password=password)
    # the exception raised here is different than serializers.ValidationError
    except exceptions.ValidationError as e:
        errors['password'] = list(e.messages)

    if errors:
        return Response({"data": errors['password']})
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
