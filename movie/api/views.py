from ..models import (
    Movie,
    Activity,
    Category,
    StillsGallery
)
from movie.api.serializers import (MovieSerializer,
                                   ActivitySerializer,
                                   CategorySerializer,
                                   StillsGallerySerializer
                                   )
from rest_framework.viewsets import ModelViewSet


class MovieView(ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class ActivityView(ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class CategoryView(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class StillsGalleryView(MovieView):
    queryset = StillsGallery.objects.all()
    serializer_class = StillsGallerySerializer
