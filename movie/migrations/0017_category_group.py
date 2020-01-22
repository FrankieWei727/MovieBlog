# Generated by Django 2.2.6 on 2020-01-16 23:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0016_remove_category_group'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='group',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='category', to='movie.CategoryGroup'),
        ),
    ]