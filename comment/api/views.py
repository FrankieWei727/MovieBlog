from rest_framework.pagination import PageNumberPagination

from comment.api.serializers import (ArticleSerializer,
                                     ReviewSerializer,
                                     ArticleCommentSerializer
                                     )

from rest_framework.viewsets import ModelViewSet
from ..models import Article, Review, ArticleComment
import django_filters.rest_framework as res_fliters
from rest_framework import filters, generics, permissions


class IsOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return request.user == obj


class ReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user


"""
    Article Review API
"""


class ArticlePagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = Article
        fields = '__all__'


class ArticleFilter(res_fliters.FilterSet):
    class Meta:
        model = Article
        fields = '__all__'


class ArticleListView(generics.ListCreateAPIView):
    queryset = Article.objects.all().filter(status='2').order_by('-created')
    serializer_class = ArticleSerializer
    pagination_class = ArticlePagination
    filter_backends = (res_fliters.DjangoFilterBackend, filters.SearchFilter)
    filterset_class = ArticleFilter
    search_fields = ('title', 'content')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ArticleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all().filter(status='2')
    serializer_class = ArticleSerializer
    permission_classes = (ReadOnly,)

    def get(self, request, *args, **kwargs):
        article = Article.objects.get(id=kwargs['pk'])
        article.views = article.views + 1
        article.save()
        return self.retrieve(request, *args, **kwargs)


class MyArticleFilter(filters.BaseFilterBackend):

    def filter_queryset(self, request, queryset, view):
        return queryset.filter(author=request.user)


class MyArticleListView(generics.ListAPIView):
    queryset = Article.objects.all().order_by('-created')
    serializer_class = ArticleSerializer
    pagination_class = ArticlePagination
    filter_backends = (res_fliters.DjangoFilterBackend, filters.SearchFilter, MyArticleFilter)
    filterset_class = ArticleFilter
    search_fields = ('title', 'body')
    permission_classes = (IsOwner,)


class MyArticleDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (ReadOnly,)
    filter_backends = (MyArticleFilter,)


"""
    Movie Review API
"""


class MovieReviewPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = Review
        fields = '__all__'


class MovieReviewFilter(res_fliters.FilterSet):
    class Meta:
        model = Review
        fields = "__all__"


class ReviewView(ModelViewSet):
    queryset = Review.objects.all().order_by('created')
    serializer_class = ReviewSerializer
    pagination_class = MovieReviewPagination
    filter_backends = (res_fliters.DjangoFilterBackend,)
    filterset_class = MovieReviewFilter

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


"""
    Article Comment API
"""


class ArticleCommentPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 128

    class Meta:
        model = ArticleComment
        fields = '__all__'


class ArticleCommentFilter(res_fliters.FilterSet):
    class Meta:
        model = ArticleComment
        fields = "__all__"


class ArticleCommentView(ModelViewSet):
    queryset = ArticleComment.objects.all().order_by('created')
    serializer_class = ArticleCommentSerializer
    pagination_class = ArticleCommentPagination
    filter_backends = (res_fliters.DjangoFilterBackend,)
    filterset_class = ArticleCommentFilter

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

