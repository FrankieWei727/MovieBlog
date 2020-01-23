from rest_framework import permissions, status
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView
from my_profile.api.serializers import UserSerializer, ProfileSerializer
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
