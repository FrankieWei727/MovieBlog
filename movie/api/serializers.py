from rest_framework import serializers
from movie.models import Category, Movie, Activity, StillsGallery


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'url')


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('id', 'url', 'title', 'created', 'start_date', 'body', 'poster', 'location', 'end_date')


class StillsGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = StillsGallery
        fields = ('id', 'photo', 'movie', 'url')


class MovieSerializer(serializers.ModelSerializer):
    stills = StillsGallerySerializer(many=True)

    class Meta:
        model = Movie
        fields = ('id', 'name', 'slug', 'director', 'scriptwriter',
                  'nation', 'star', 'length', 'year', 'language',
                  'description', 'poster', 'rank', 'created', 'updated', 'video',
                  'movie_views', 'category', 'users_like', 'stills')
