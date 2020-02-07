from django.contrib import admin
from .models import Category, CategoryGroup, Movie, Event, StillsGallery, VideoSource, MovieFans


class VideoSourceAdmin(admin.ModelAdmin):
    list_display = ['movie', 'website', 'url']


admin.site.register(VideoSource, VideoSourceAdmin)


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', ]


admin.site.register(Category, CategoryAdmin)


class CategoryGroupAdmin(admin.ModelAdmin):
    list_display = ['name', ]


admin.site.register(CategoryGroup, CategoryGroupAdmin)


class MovieAdmin(admin.ModelAdmin):
    list_display = ['name', 'id', 'region', 'rank', 'length']
    list_filter = ['rank', 'created', 'updated', 'release_date']
    search_fields = ('name', 'release_date')
    # list_editable = ['rank', 'name',]


admin.site.register(Movie, MovieAdmin)


class MovieFansAdmin(admin.ModelAdmin):
    list_display = ['movie', 'fans']
    search_fields = ('movie',)


admin.site.register(MovieFans, MovieFansAdmin)


class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'created']
    list_filter = ['created']
    prepopulated_fields = {'slug': ('title',)}


admin.site.register(Event, EventAdmin)


class StillsAdmin(admin.ModelAdmin):
    list_display = ['movie']
    search_fields = ('movie__name', 'id')


admin.site.register(StillsGallery, StillsAdmin)
