# Generated by Django 2.2.6 on 2019-11-02 22:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0002_movie_movie_views'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='location',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='activity',
            name='poster',
            field=models.ImageField(blank=True, null=True, upload_to='movies/%Y/%m/%d'),
        ),
    ]