from rest_framework import routers
from django.urls import path, include
from .views import (
    MovieView,
    MovieCreateView,
    MovieFansListView,
    MovieRankUpdateView,
    EventView,
    CategoryView,
    CategoryGroupView,
    StillsGalleryView,
    VideoSourceView,
    like,
    unlike,
    islike,
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
    path('update_movie_rank/<int:pk>', MovieRankUpdateView.as_view(), name='update_movie_rank'),
    path('movie/fans/', MovieFansListView.as_view(), name='movie_fans'),
    path('movie/fans/<int:pk>/like/', like, name='like-movie'),
    path('movie/fans/<int:pk>/unlike/', unlike, name='unlike-movie'),
    path('movie/fans/<int:pk>/is_like/', islike, name='is-like-movie'),
]
