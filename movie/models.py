from django.db import models
from django.urls import reverse
from django.contrib.auth.models import User

"""
    Category models
"""


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


"""
    Movie model
"""


class Movie(models.Model):
    title = models.CharField(max_length=255, unique=True, default="")
    poster = models.CharField(max_length=300, blank=True, null=True)
    amount_reviews = models.PositiveIntegerField(blank=True, null=True)
    user_rating = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    description = models.TextField(blank=True, null=True)
    directors = models.CharField(max_length=200, null=True)
    scriptwriters = models.CharField(max_length=200, null=True)
    release_date = models.DateField(blank=True, null=True)
    runtime = models.IntegerField(null=True)
    trailer = models.CharField(max_length=300, blank=True, null=True)
    countries = models.CharField(max_length=100, blank=True, null=True)
    languages = models.CharField(max_length=100, blank=True, null=True)
    actors = models.CharField(max_length=300, blank=True, null=True)
    categories = models.ManyToManyField(Category, related_name='movies', blank=True)

    class Meta:
        ordering = ('title',)
        index_together = (('id',),)

    def __str__(self):
        return self.title


class MovieFans(models.Model):
    fans = models.ForeignKey(User, on_delete=models.PROTECT, related_name='fans', blank=True, default="")
    movie = models.ForeignKey(Movie, on_delete=models.PROTECT, related_name='movie', blank=True, default="")
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['fans', 'movie']

    def __str__(self):
        return '%s' % self.fans.username


class VideoSource(models.Model):
    movie = models.ForeignKey(Movie, related_name='videos', on_delete=models.CASCADE)
    website = models.CharField(max_length=128, default='')
    url = models.CharField(max_length=128)

    def __str__(self):
        return self.movie.title + str(self.id)


class StillsGallery(models.Model):
    movie = models.ForeignKey(Movie, related_name='stills', on_delete=models.CASCADE)
    photo = models.CharField(max_length=800)

    def __str__(self):
        return self.movie.title + str(self.id)


class Event(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200)
    content = models.TextField()
    active = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    location = models.CharField(max_length=200, null=True)
    poster = models.CharField(max_length=400, null=True)
    time = models.CharField(max_length=400, blank=True, null=True)
    organizer = models.CharField(max_length=300, blank=True, null=True)

    class Meta:
        ordering = ('created',)

    def __str__(self):
        return self.title
