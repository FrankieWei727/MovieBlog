# Generated by Django 2.2.6 on 2019-11-03 02:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0005_stillsgallery'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stillsgallery',
            name='photo',
            field=models.CharField(max_length=800),
        ),
    ]
