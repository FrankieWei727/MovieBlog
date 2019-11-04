from rest_framework import routers
from .views import (CommentView,
                    ShortCommentView,
                    AnotherCommentView
                    )
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'reviews', CommentView)
router.register(r'comments', ShortCommentView)
router.register(r'replys', AnotherCommentView)


urlpatterns = [

    path(r'', include(router.urls)),
]
