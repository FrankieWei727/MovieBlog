from django.db import models
from django.utils import timezone
from movie.models import Movie
from django.contrib.auth.models import User
from django.urls import reverse


class Review(models.Model):
    user = models.ForeignKey(User,
                             related_name='reviews', on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie,
                              related_name='reviews', on_delete=models.CASCADE)
    content = models.TextField(max_length=400)
    created = models.DateTimeField(auto_now_add=True)
    rate = models.DecimalField(max_digits=10, decimal_places=2)
    active = models.BooleanField(default=True)

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return 'Review by {} in {}'.format(self.user, self.created)


class Article(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(User,
                               related_name='articles', on_delete=models.CASCADE)
    # movie = models.ForeignKey(Movie,
    #                           related_name='articles', on_delete=models.CASCADE)
    content = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    views = models.IntegerField(default=0)

    STATUS_CHOICES = (
        ('1', 'Draft'),
        ('2', 'Publish')
    )
    status = models.CharField(max_length=24, choices=STATUS_CHOICES, default='1', blank=True)

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return self.title


class ArticleComment(models.Model):
    content = models.TextField(max_length=400)
    author = models.ForeignKey(User,
                               related_name='article_comments', on_delete=models.CASCADE)
    article = models.ForeignKey(Article,
                                related_name='article_comments', default="", on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)
