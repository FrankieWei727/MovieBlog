from rest_framework import serializers
from movie.models import Category, Movie, Activity, StillsGallery


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'url')


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('id', 'url', 'title', 'created', 'date', 'body', 'poster', 'location', 'todate')


class StillsGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = StillsGallery
        fields = ('id', 'photo', 'movie', 'url')
