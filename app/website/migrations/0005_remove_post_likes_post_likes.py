# Generated by Django 4.0.5 on 2024-01-05 19:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0004_remove_post_likes_post_likes'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='likes',
        ),
        migrations.AddField(
            model_name='post',
            name='likes',
            field=models.TextField(default='0'),
        ),
    ]