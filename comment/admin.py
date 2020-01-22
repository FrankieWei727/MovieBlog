from django.contrib import admin
from .models import Review, Article, ArticleComment


class ReviewAdmin(admin.ModelAdmin):
    list_display = ['user', 'movie', 'created']
    list_filter = ['movie']


admin.site.register(Review, ReviewAdmin)


class ArticleAdmin(admin.ModelAdmin):
    list_display = ['author', 'id', 'created']
    list_filter = ['created']


admin.site.register(Article, ArticleAdmin)


class ArticleCommentAdmin(admin.ModelAdmin):
    list_display = ['author', 'created', 'article']


admin.site.register(ArticleComment, ArticleCommentAdmin)
