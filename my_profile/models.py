from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date_of_birth = models.DateField(blank=True, null=True)
    # avatar = models.ImageField(upload_to='users/%Y/%m/%d', blank=True)
    avatar = models.CharField(max_length=800, null=True)

    def __str__(self):
        return 'Profile for user {}'.format(self.user_id)

    def get_absolute_url(self):
        user = self.user
        return reverse('user_detail', args=[user.username])
