from rest_framework import routers
from django.urls import path, include
from .views import (
    MovieView,
    ActivityView,
    CategoryView,
    StillsGalleryView,
)

router = routers.DefaultRouter()
router.register(r'movies', MovieView)
router.register(r'activities', ActivityView)
router.register(r'categories', CategoryView)
router.register(r'stills', StillsGalleryView)

urlpatterns = [

    path(r'', include(router.urls)),
]
