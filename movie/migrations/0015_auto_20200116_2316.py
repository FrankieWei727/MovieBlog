# Generated by Django 2.2.6 on 2020-01-16 23:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0014_auto_20200116_2315'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='group',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='category', to='movie.CategoryGroup'),
        ),
    ]