from rest_framework import serializers
from comment.models import Article, ArticleComment, Review
from my_profile.api.serializers import UserSerializer


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Review
        fields = ('id', 'url', 'movie', 'content', 'created', 'rate', 'active', 'user')
        ordering = ('-created',)


class ArticleSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Article
        fields = ('id', 'url', 'title', 'content', 'created', 'author', 'status', 'views')
        ordering = ('-created',)


class ArticleCommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = ArticleComment
        fields = ('id', 'url', 'content', 'article', 'created', 'author')
