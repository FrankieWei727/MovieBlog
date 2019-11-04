from rest_framework import serializers
from comment.models import Comment, AnotherComment, ShortComment
from account.api.serializers import UserSerializer
from movie.api.serializers import MovieSerializer


class ShortCommentSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    movie = MovieSerializer()

    class Meta:
        model = ShortComment
        fields = ('id', 'url', 'author', 'movie', 'body', 'created', 'rank', 'active')
        ordering = ('-created',)


class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    movie = MovieSerializer()

    class Meta:
        model = Comment
        fields = ('id', 'url', 'title', 'slug', 'author', 'movie', 'body', 'created', 'active')
        ordering = ('-created',)


class AnotherCommentSerializer(serializers.ModelSerializer):
    author = UserSerializer()

    class Meta:
        model = AnotherComment
        fields = ('id', 'url', 'body', 'author', 'comment', 'created', 'active')
