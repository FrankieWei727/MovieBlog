from rest_framework import serializers
from movie.models import Category, CategoryGroup, Movie, Event, StillsGallery, VideoSource, MovieFans

from my_profile.api.serializers import UserBriefSerializer


class VideoSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoSource
        fields = ('website', 'url', 'movie')

        def create(self, validated_data):
            print(validated_data)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name', 'id')


class CategoryGroupSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=True)

    class Meta:
        model = CategoryGroup
        fields = ('name', 'category')


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'url', 'title', 'created', 'start_date', 'content', 'poster', 'location', 'end_date')


class StillsGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = StillsGallery
        fields = ('id', 'photo', 'movie')

        def create(self, validated_data):
            print(validated_data)


class MovieSerializer(serializers.ModelSerializer):
    stills = StillsGallerySerializer(many=True, read_only=True)
    category = CategorySerializer(many=True)
    videos = VideoSourceSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = ('id', 'url', 'name', 'director', 'scriptwriter',
                  'region', 'actors', 'length', 'release_date', 'language',
                  'description', 'poster', 'rank', 'created', 'updated', 'video',
                  'movie_views', 'category', 'stills', 'videos')
        read_only_fields = ['users_like']


class MovieCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'url', 'name', 'director', 'scriptwriter',
                  'region', 'actors', 'length', 'release_date', 'language',
                  'description', 'poster', 'created', 'updated', 'video',
                  'movie_views', 'category')

    def create(self, validated_data):
        categories = validated_data.pop('category')
        movie = Movie.objects.create(**validated_data)
        movie.category.set(categories)
        movie.save()
        return movie


class MovieRankUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'name', 'rank')

    def update(self, instance, validated_data):
        print(validated_data)
        instance.rank = validated_data.get('rank', instance.rank)
        instance.save()
        return instance


"""
    Like movie 
"""


class MovieBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'name', 'url')


class MovieFansSerializer(serializers.ModelSerializer):
    movie = MovieBriefSerializer()
    fans = UserBriefSerializer()

    class Meta:
        model = MovieFans
        fields = ('id', 'movie', 'fans')
