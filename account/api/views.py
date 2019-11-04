from rest_framework.viewsets import ModelViewSet
from account.api.serializers import UserSerializer, ProfileSerializer
from account.models import Profile, User


class UserView(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileView(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

