from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User


class CategoryGroup(models.Model):
    name = models.CharField(max_length=128, default="")

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=200,
                            db_index=True)

    group = models.ForeignKey(CategoryGroup, related_name='category', on_delete=models.CASCADE, default="")

    class Meta:
        ordering = ('name',)
        verbose_name = 'category'
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('movies:movie_list_by_category', args=[self.slug])


class Movie(models.Model):
    category = models.ManyToManyField(Category,
                                      related_name='movies', blank=True)
    name = models.CharField(max_length=200)
    director = models.CharField(max_length=200)
    scriptwriter = models.CharField(max_length=200)
    region = models.CharField(max_length=100)
    actors = models.CharField(max_length=200)
    length = models.IntegerField(null=True)
    release_date = models.DateField(null=True)
    language = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True)
    poster = models.CharField(max_length=300, blank=True, default="")
    rank = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    users_like = models.ManyToManyField(User,
                                        related_name='movies_liked',
                                        blank=True)
    video = models.CharField(max_length=300, default="")

    movie_views = models.IntegerField(default=0, null=True)

    class Meta:
        ordering = ('name',)
        index_together = (('id',),)

    def __str__(self):
        return self.name


class VideoSource(models.Model):
    movie = models.ForeignKey(Movie, related_name='videos', on_delete=models.CASCADE)
    website = models.CharField(max_length=128, default='')
    url = models.CharField(max_length=128)

    def __str__(self):
        return self.movie.name + str(self.id)


class StillsGallery(models.Model):
    movie = models.ForeignKey(Movie, related_name='stills', on_delete=models.CASCADE)
    photo = models.CharField(max_length=800)

    def __str__(self):
        return self.movie.name + str(self.id)


class Event(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)
    content = models.TextField()
    active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    location = models.CharField(max_length=200, null=True)
    # poster = models.ImageField(upload_to='events/%Y/%m/%d', blank=True, null=True)
    poster = models.CharField(max_length=400, null=True)

    class Meta:
        ordering = ('created',)

    def __str__(self):
        return self.title
