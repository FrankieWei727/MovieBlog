from django.conf.urls import url,include
from . import views
from django.contrib.auth import views as auth_views


urlpatterns = [

    url('', include('social_django.urls', namespace='social')),

    # login logout
    url(r'^login/$', views.login_and_register, name='login'),
    url(r'^logout/$', auth_views.LogoutView.as_view(), name='logout'),
    url(r'^logout-then-login/$', auth_views.logout_then_login, name='logout_then_login'),

    # change password
    url(r'^password-change/$', auth_views.PasswordChangeView.as_view(),
        {'template_name': 'registration/password_form.html'},
        name='password_change'),
    url(r'^password-change/done/$', auth_views.PasswordChangeDoneView.as_view(),
        {'template_name': 'registration/password_change_done.html'},
        name='password_change_done'),

    # reset password
    # restore password urls
    url(r'^password-reset/$', auth_views.PasswordResetView.as_view(),
        name='password_reset'),
    url(r'^password-reset/done/$', auth_views.PasswordResetDoneView.as_view(),
        name='password_reset_done'),
    url(r'^password-reset/confirm/(?P<uidb64>[-\w]+)/(?P<token>[-\w]+)/$',
        auth_views.PasswordResetConfirmView.as_view(),
        name='password_reset_confirm'),
    url(r'^password-reset/complete/$',
        auth_views.PasswordResetCompleteView.as_view(),
        name='password_reset_complete'),

    # view your dashboard
    url(r'^dashboard/$', views.dashboard, name='dashboard'),
    url(r'^$', views.home, name='home'),

    # edit profile
    url(r'^edit/$', views.edit, name='edit'),

    url(r'^user-detail/(?P<username>[-\w]+)/$', views.user_detail, name='user_detail'),

    # url(r'^users/(?P<username>[-\w]+)/$',
    # views.user_detail,
    # name='user_detail'),

    # url(r'^users/follow/$', views.user_follow, name='user_follow'),

]
