# Generated by Django 2.2.6 on 2020-01-28 22:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0030_auto_20200123_2156'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='poster',
            field=models.CharField(max_length=400, null=True),
        ),
    ]
