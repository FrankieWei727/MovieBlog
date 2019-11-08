from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView
from my_profile.api.serializers import UserSerializer, ProfileSerializer
from my_profile.models import Profile, User
# from rest_auth.models import TokenModel


class UserView(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileView(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

#
# class TokenModelView(ListAPIView):
#     queryset = TokenModel.objects.all()
#     serializer_class = TokenSerializer
