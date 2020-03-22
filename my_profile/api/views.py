from django.core import exceptions
from rest_framework import permissions, status, serializers, generics
from rest_framework.decorators import permission_classes, api_view
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListAPIView, get_object_or_404
import django.contrib.auth.password_validation as validators
from my_profile.api.serializers import UserSerializer, ProfileSerializer, UserSingUpSerializer, FollowUserSerializer
from my_profile.models import Profile, User, FollowUser
import django_filters.rest_framework as res_fliters
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import filters


class UserView(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileView(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class FollowUserPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = FollowUser
        fields = '__all__'


class FollowUserFilter(res_fliters.FilterSet):
    class Meta:
        model = FollowUser
        fields = '__all__'


class FollowUserList(generics.ListCreateAPIView):
    queryset = FollowUser.objects.all()
    serializer_class = FollowUserSerializer
    pagination_class = FollowUserPagination
    filterset_class = FollowUserFilter
    filter_backends = (res_fliters.DjangoFilterBackend,)


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
    exists = User.objects.filter(username=username)
    if exists:
        return Response({"data": 'Username is exists'})
    else:
        return Response({"data": 'null'})


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


# To follow user
@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def follow(request, pk):
    try:
        follower = User.objects.get(id=request.user.id)
        user = User.objects.get(id=pk)
    except ObjectDoesNotExist:
        return Response({'code': '3', 'message': 'user or follower does not exist.'})
    try:
        follower = FollowUser.objects.get(user=user, follower=follower)
        return Response({'code': '2', 'message': 'have followed'})
    except ObjectDoesNotExist:
        follower = FollowUser(user=user, follower=follower)
        follower.save()
    return Response({'code': '1', 'message': 'succeed'})


# To unfollow user
@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def unfollow(request, pk):
    try:
        follower = User.objects.get(id=request.user.id)
        user = User.objects.get(id=pk)
    except ObjectDoesNotExist:
        return Response({'code': '3', 'message': 'user or follower does not exist.'})
    try:
        followers = FollowUser.objects.get(user=user, follower=follower)
        followers.delete()
        return Response({'code': '1', 'message': 'succeed'})
    except ObjectDoesNotExist:
        return Response({'code': '2', 'message': 'have followed'})


# Check followed or not
@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def isfollow(request, pk):
    try:
        follower = User.objects.get(id=request.user.id)
        user = User.objects.get(id=pk)
    except ObjectDoesNotExist:
        return Response({'code': '3', 'message': 'user or follower does not exist.'})

    try:
        followers = FollowUser.objects.get(user=user, follower=follower)
        return Response({'code': '1', 'message': 'followed'})
    except ObjectDoesNotExist:
        return Response({'code': '2', 'message': 'not follow yet'})
