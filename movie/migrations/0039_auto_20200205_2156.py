# Generated by Django 2.2.6 on 2020-02-05 21:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0038_auto_20200205_2155'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='length',
            field=models.IntegerField(null=True),
        ),
    ]