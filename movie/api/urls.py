from rest_framework import routers
from django.urls import path, include
from .views import (
    MovieView,
    ActivityView,
    CategoryView,
    CategoryGroupView,
    StillsGalleryView,
    VideoSourceView,
)

router = routers.DefaultRouter()
router.register(r'movies', MovieView)
router.register(r'activities', ActivityView)
router.register(r'categories', CategoryView)
router.register(r'categories_group', CategoryGroupView)
router.register(r'stills', StillsGalleryView)
router.register(r'videos', VideoSourceView)

urlpatterns = [

    path(r'', include(router.urls)),
]
