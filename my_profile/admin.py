from django.contrib import admin
from .models import Profile, FollowUser


class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'date_of_birth', 'id']
    list_filter = ['user']


admin.site.register(Profile, ProfileAdmin)


class FollowUserAdmin(admin.ModelAdmin):
    list_display = ['user', 'follower']


admin.site.register(FollowUser, FollowUserAdmin)
