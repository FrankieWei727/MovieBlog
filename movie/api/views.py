from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from my_profile.models import User
from ..models import (
    Movie,
    Event,
    Category,
    CategoryGroup,
    StillsGallery,
    VideoSource,
    MovieFans
)
from movie.api.serializers import (MovieSerializer,
                                   MovieCreateSerializer,
                                   MovieFansSerializer,
                                   MovieRankUpdateSerializer,
                                   EventSerializer,
                                   CategorySerializer,
                                   CategoryGroupSerializer,
                                   StillsGallerySerializer,
                                   VideoSourceSerializer,
                                   )
from rest_framework.viewsets import ModelViewSet, generics
from rest_framework.pagination import PageNumberPagination
import django_filters.rest_framework as res_fliters
from rest_framework import filters, permissions


class CategoryView(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CategoryGroupView(ModelViewSet):
    queryset = CategoryGroup.objects.all()
    serializer_class = CategoryGroupSerializer


class StillsGalleryView(ModelViewSet):
    queryset = StillsGallery.objects.all()
    serializer_class = StillsGallerySerializer


class VideoSourceView(ModelViewSet):
    queryset = VideoSource.objects.all()
    serializer_class = VideoSourceSerializer


"""
    Movie API 
"""


class MoviePagination(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = Movie
        fields = '__all__'


class MovieFilter(res_fliters.FilterSet):
    name = res_fliters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Movie
        fields = ['title', 'categories']


class MovieView(ModelViewSet):
    queryset = Movie.objects.all().order_by('-release_date')
    serializer_class = MovieSerializer
    pagination_class = MoviePagination
    filter_backends = [res_fliters.DjangoFilterBackend]
    filterset_class = MovieFilter


class MovieCreateView(generics.CreateAPIView):
    queryset = Movie.objects.all().order_by('-release_date')
    serializer_class = MovieCreateSerializer


class MovieRankUpdateView(generics.UpdateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieRankUpdateSerializer


"""
    Like movie 
"""


class MovieFansPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = MovieFans
        fields = '__all__'


class MovieFansFilter(res_fliters.FilterSet):
    class Meta:
        model = MovieFans
        fields = ['movie', 'fans']


class MovieFansListView(generics.ListAPIView):
    queryset = MovieFans.objects.all()
    serializer_class = MovieFansSerializer
    pagination_class = MovieFansPagination
    filterset_class = MovieFansFilter
    filter_backends = (res_fliters.DjangoFilterBackend,)


# To like movie
@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def like(request, pk):
    try:
        fans = User.objects.get(id=request.user.id)
        movie = Movie.objects.get(id=pk)
    except ObjectDoesNotExist:
        return Response({'code': '3', 'message': 'user or movie does not exist.'})
    try:
        fans = MovieFans.objects.get(fans=fans, movie=movie)
        return Response({'code': '2', 'message': 'have followed'})
    except ObjectDoesNotExist:
        fans = MovieFans(fans=fans, movie=movie)
        fans.save()
    return Response({'code': '1', 'message': 'succeed'})


# To unlike movie
@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def unlike(request, pk):
    try:
        fans = User.objects.get(id=request.user.id)
        movie = Movie.objects.get(id=pk)
    except ObjectDoesNotExist:
        return Response({'code': '3', 'message': 'user or movie does not exist.'})
    try:
        fans = MovieFans.objects.get(fans=fans, movie=movie)
        fans.delete()
        return Response({'code': '1', 'message': 'succeed'})
    except ObjectDoesNotExist:
        return Response({'code': '2', 'message': 'unlike'})


# Check like or not
@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def islike(request, pk):
    try:
        fans = User.objects.get(id=request.user.id)
        movie = Movie.objects.get(id=pk)
    except ObjectDoesNotExist:
        return Response({'code': '3', 'message': 'user or follower does not exist.'})

    try:
        fans = MovieFans.objects.get(fans=fans, movie=movie)
        return Response({'code': '1', 'message': 'like'})
    except ObjectDoesNotExist:
        return Response({'code': '2', 'message': 'unlike'})


"""
    Event API
"""


class EventPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = Movie
        fields = '__all__'


class EventView(ModelViewSet):
    queryset = Event.objects.all().order_by('-start_date')
    pagination_class = EventPagination
    serializer_class = EventSerializer
