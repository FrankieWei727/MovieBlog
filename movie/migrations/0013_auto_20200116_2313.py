# Generated by Django 2.2.6 on 2020-01-16 23:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0012_auto_20200116_2312'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categorygroup',
            name='name',
            field=models.CharField(max_length=128, null=True),
        ),
    ]
