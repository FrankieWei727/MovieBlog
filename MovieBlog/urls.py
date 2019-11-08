from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [

    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('api/account/', include('my_profile.api.urls')),
    path('api/comment/', include('comment.api.urls')),
    path('api/movie/', include('movie.api.urls')),

    url(r'^account/', include('my_profile.urls')),
    url(r'^movie/', include(('movie.urls', 'movies'), namespace="movies")),
    url(r'^comment/', include(('comment.urls', 'comment'), namespace="comments")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
