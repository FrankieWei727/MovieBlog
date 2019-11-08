from django.utils import formats
from rest_framework import serializers
from comment.models import Comment, AnotherComment, ShortComment
from my_profile.api.serializers import UserSerializer
from movie.api.serializers import MovieSerializer


class ShortCommentSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    movie = MovieSerializer()

    class Meta:
        model = ShortComment
        fields = ('id', 'url', 'movie', 'body', 'created', 'rank', 'active', 'author')
        ordering = ('-created',)


class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    movie = MovieSerializer()

    class Meta:
        model = Comment
        fields = ('id', 'url', 'title', 'slug', 'movie', 'body', 'created', 'active', 'author')
        ordering = ('-created',)


class AnotherCommentSerializer(serializers.ModelSerializer):
    author = UserSerializer()

    class Meta:
        model = AnotherComment
        fields = ('id', 'url', 'body', 'comment', 'created', 'active', 'author')
