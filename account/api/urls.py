from rest_framework import routers
from account.api import views
from django.urls import include,path


router = routers.DefaultRouter()
router.register(r'users', views.UserView)
router.register(r'profiles', views.ProfileView)


urlpatterns = [

    path(r'', include(router.urls)),
]
