# Generated by Django 2.2.6 on 2020-04-01 07:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=200)),
            ],
            options={
                'verbose_name': 'category',
                'verbose_name_plural': 'categories',
                'ordering': ('name',),
            },
        ),
        migrations.CreateModel(
            name='CategoryGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('slug', models.SlugField(max_length=200)),
                ('content', models.TextField()),
                ('active', models.BooleanField(default=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('start_date', models.DateField(blank=True, null=True)),
                ('end_date', models.DateField(blank=True, null=True)),
                ('location', models.CharField(max_length=200, null=True)),
                ('poster', models.CharField(max_length=400, null=True)),
            ],
            options={
                'ordering': ('created',),
            },
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='', max_length=255, unique=True)),
                ('poster', models.CharField(blank=True, max_length=300, null=True)),
                ('amount_reviews', models.PositiveIntegerField(blank=True, null=True)),
                ('user_rating', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('description', models.TextField(blank=True, null=True)),
                ('directors', models.CharField(max_length=200, null=True)),
                ('scriptwriters', models.CharField(max_length=200, null=True)),
                ('release_date', models.DateField(blank=True, null=True)),
                ('runtime', models.IntegerField(null=True)),
                ('trailer', models.CharField(blank=True, max_length=300, null=True)),
                ('countries', models.CharField(blank=True, max_length=100, null=True)),
                ('languages', models.CharField(blank=True, max_length=100, null=True)),
                ('actors', models.CharField(blank=True, max_length=300, null=True)),
                ('categories', models.ManyToManyField(blank=True, related_name='movies', to='movie.Category')),
            ],
            options={
                'ordering': ('title',),
                'index_together': {('id',)},
            },
        ),
        migrations.CreateModel(
            name='VideoSource',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('website', models.CharField(default='', max_length=128)),
                ('url', models.CharField(max_length=128)),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='videos', to='movie.Movie')),
            ],
        ),
        migrations.CreateModel(
            name='StillsGallery',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.CharField(max_length=800)),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='stills', to='movie.Movie')),
            ],
        ),
        migrations.AddField(
            model_name='category',
            name='group',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='category', to='movie.CategoryGroup'),
        ),
        migrations.CreateModel(
            name='MovieFans',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('fans', models.ForeignKey(blank=True, default='', on_delete=django.db.models.deletion.PROTECT, related_name='fans', to=settings.AUTH_USER_MODEL)),
                ('movie', models.ForeignKey(blank=True, default='', on_delete=django.db.models.deletion.PROTECT, related_name='movie', to='movie.Movie')),
            ],
            options={
                'unique_together': {('fans', 'movie')},
            },
        ),
    ]
