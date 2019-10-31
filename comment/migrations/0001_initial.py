# Generated by Django 2.2.6 on 2019-10-30 10:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('movie', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ShortComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.TextField(max_length=400)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('rank', models.DecimalField(decimal_places=2, max_digits=10)),
                ('active', models.BooleanField(default=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='shortcomments', to=settings.AUTH_USER_MODEL)),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='shortcomments', to='movie.Movie')),
            ],
            options={
                'ordering': ('-created',),
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('slug', models.SlugField(max_length=200)),
                ('body', models.TextField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('active', models.BooleanField(default=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to=settings.AUTH_USER_MODEL)),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='movie.Movie')),
            ],
            options={
                'ordering': ('-created',),
            },
        ),
        migrations.CreateModel(
            name='AnotherComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', models.TextField(max_length=400)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('active', models.BooleanField(default=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='anothercomments', to=settings.AUTH_USER_MODEL)),
                ('comment', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='anothercomments', to='comment.Comment')),
            ],
        ),
    ]
