from rest_framework import serializers
from movie.models import Category, CategoryGroup, Movie, Activity, StillsGallery, VideoSource


class VideoSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoSource
        fields = ('website', 'url')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name', 'id')


class CategoryGroupSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=True)

    class Meta:
        model = CategoryGroup
        fields = ('name', 'category')


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ('id', 'url', 'title', 'created', 'start_date', 'body', 'poster', 'location', 'end_date')


class StillsGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = StillsGallery
        fields = ('id', 'photo', 'url')


class MovieSerializer(serializers.ModelSerializer):
    stills = StillsGallerySerializer(many=True)
    category = CategorySerializer(many=True)
    videos = VideoSourceSerializer(many=True)

    class Meta:
        model = Movie
        fields = ('id', 'url', 'name', 'slug', 'director', 'scriptwriter',
                  'region', 'actors', 'length', 'release_date', 'language',
                  'description', 'poster', 'rank', 'created', 'updated', 'video',
                  'movie_views', 'category', 'users_like', 'stills', 'videos')


class MovieListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'name', 'url')
