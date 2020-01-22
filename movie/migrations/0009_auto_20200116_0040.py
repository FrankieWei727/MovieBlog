# Generated by Django 2.2.6 on 2020-01-16 00:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0008_auto_20191107_2326'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='movie',
            name='category',
        ),
        migrations.AddField(
            model_name='movie',
            name='category',
            field=models.ManyToManyField(blank=True, related_name='movies', to='movie.Category'),
        ),
    ]