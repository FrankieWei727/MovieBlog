from rest_framework import routers
from my_profile.api import views
from django.urls import include, path


router = routers.DefaultRouter()
router.register('users', views.UserView)
router.register('profiles', views.ProfileView)

urlpatterns = [

    path('', include(router.urls)),
    path('user/<int:pk>/apply/', views.apply_editor_permission, name='apply-editor-permission'),
    path('user/<int:pk>/cancel_apply/', views.cancel_apply_editor_permission, name='cancel-apply-editor-perm'),
]
