from comment.api.serializers import (CommentSerializer,
                                     ShortCommentSerializer,
                                     AnotherCommentSerializer)

from rest_framework.viewsets import ModelViewSet
from ..models import Comment, ShortComment, AnotherComment


class CommentView(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class ShortCommentView(ModelViewSet):
    queryset = ShortComment.objects.all()
    serializer_class = ShortCommentSerializer


class AnotherCommentView(ModelViewSet):
    queryset = AnotherComment.objects.all()
    serializer_class = AnotherCommentSerializer
