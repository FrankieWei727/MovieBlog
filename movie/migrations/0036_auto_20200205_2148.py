# Generated by Django 2.2.6 on 2020-02-05 21:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0035_auto_20200205_2142'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='release_date',
            field=models.CharField(default='', max_length=100),
        ),
    ]