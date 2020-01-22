from ..models import (
    Movie,
    Activity,
    Category,
    CategoryGroup,
    StillsGallery,
    VideoSource,
)
from movie.api.serializers import (MovieSerializer,
                                   ActivitySerializer,
                                   CategorySerializer,
                                   CategoryGroupSerializer,
                                   StillsGallerySerializer,
                                   VideoSourceSerializer,
                                   )
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import PageNumberPagination
import django_filters.rest_framework as res_fliters
from rest_framework import filters


class MoviePagination(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = Movie
        fields = '__all__'


class MovieFilter(res_fliters.FilterSet):
    class Meta:
        model = Movie
        exclude = ['poster', 'video', 'description', 'stills',
                   'rank', 'created', 'updated', 'users_like', 'movie_views', 'length',
                   'video_source']


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


class MovieView(ModelViewSet):
    queryset = Movie.objects.all().order_by('-release_date')
    serializer_class = MovieSerializer
    pagination_class = MoviePagination
    filter_backends = [res_fliters.DjangoFilterBackend, filters.SearchFilter]
    search_fields = ('name',)
    filterset_class = MovieFilter


class ActivityView(ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
