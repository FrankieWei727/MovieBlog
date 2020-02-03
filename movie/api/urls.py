from rest_framework import routers
from django.urls import path, include
from .views import (
    MovieView,
    MovieCreateView,
    MovieRankUpdateView,
    EventView,
    CategoryView,
    CategoryGroupView,
    StillsGalleryView,
    VideoSourceView,
)

router = routers.DefaultRouter()
router.register(r'movies', MovieView)
router.register(r'events', EventView)
router.register(r'categories', CategoryView)
router.register(r'categories_group', CategoryGroupView)
router.register(r'stills', StillsGalleryView)
router.register(r'videos', VideoSourceView)

urlpatterns = [

    path(r'', include(router.urls)),
    path('create_movie/', MovieCreateView.as_view(), name='create_movie'),
    path('update_movie_rank/<int:pk>', MovieRankUpdateView.as_view(), name='update_movie_rank')
]
