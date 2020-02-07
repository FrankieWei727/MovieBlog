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
    path('user_name/validate/<str:username>', views.validate_username, name='user-name-validate'),
    path('user_email/validate/<str:email>', views.validate_email, name='user-email-validate'),
    path('user_password/validate/<str:password>', views.validate_password, name='user-email-password'),
    path('user/<int:pk>/follow/', views.follow, name='follow-user'),
    path('user/<int:pk>/unfollow/', views.unfollow, name='unfollow-user'),
    path('user/<int:pk>/is_followed/', views.isfollow, name='isfollow-user'),
    path('user/followers/', views.FollowUserList.as_view(), name='followers-list'),

]
