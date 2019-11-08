from rest_framework import routers
from my_profile.api import views
from django.urls import include, path


router = routers.DefaultRouter()
router.register('users', views.UserView)
router.register('profiles', views.ProfileView)
# router.register('tokens', views.TokenModelView)


urlpatterns = [

    path('', include(router.urls)),
]
