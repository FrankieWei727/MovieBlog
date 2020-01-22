from rest_framework import routers
from .views import (ArticleListView,
                    ArticleDetailView,
                    MyArticleListView,
                    MyArticleDetailView,
                    ReviewView,
                    ArticleCommentView
                    )
from django.urls import path, include

router = routers.DefaultRouter()
router.register(r'reviews', ReviewView)
router.register(r'article_comments', ArticleCommentView)

urlpatterns = [
    path('articles/', ArticleListView.as_view(), name='article-list'),
    path('articles/<int:pk>', ArticleDetailView.as_view(), name='article-detail'),
    path('my_articles/', MyArticleListView.as_view(), name='my-article-list'),
    path('my_articles/<int:pk>', MyArticleDetailView.as_view(), name='my-article-detail'),
    path(r'', include(router.urls)),

]
