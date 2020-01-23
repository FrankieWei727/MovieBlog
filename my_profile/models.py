from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_delete


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date_of_birth = models.DateField(blank=True, null=True)
    # avatar = models.ImageField(upload_to='users/%Y/%m/%d', blank=True, default="")
    avatar = models.CharField(max_length=100, blank=True, default='')
    bio = models.CharField(max_length=100, blank=True, default='Hello World.')
    cover = models.CharField(max_length=300, default='https://i.imgur.com/1kZR1f9.jpg')

    EDITOR_Permission_CHOICES = (
        ('unreviewed', 'unreviewed'),
        ('reviewing', 'reviewing'),
        ('reviewed', 'reviewed')
    )
    permission = models.CharField(max_length=24, choices=EDITOR_Permission_CHOICES, default='unreviewed', blank=True)

    def __str__(self):
        return 'Profile for user {}'.format(self.user_id)


    @receiver(post_save, sender=User)
    def create_profile_for_user(sender, instance=None, created=False, **kwargs):
        if created:
            Profile.objects.get_or_create(user=instance)

    @receiver(pre_delete, sender=User)
    def delete_profile_for_user(sender, instance=None, **kwargs):
        if instance:
            user_profile = Profile.objects.get(user=instance)
            user_profile.delete()
