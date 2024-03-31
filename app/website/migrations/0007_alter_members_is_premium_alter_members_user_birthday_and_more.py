# Generated by Django 4.0.5 on 2024-02-02 20:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0006_members'),
    ]

    operations = [
        migrations.AlterField(
            model_name='members',
            name='is_premium',
            field=models.TextField(default='false'),
        ),
        migrations.AlterField(
            model_name='members',
            name='user_birthday',
            field=models.TextField(default='none'),
        ),
        migrations.AlterField(
            model_name='members',
            name='user_email',
            field=models.TextField(default='none'),
        ),
        migrations.AlterField(
            model_name='members',
            name='user_first_name',
            field=models.TextField(default='none'),
        ),
        migrations.AlterField(
            model_name='members',
            name='user_gender',
            field=models.TextField(default='none'),
        ),
        migrations.AlterField(
            model_name='members',
            name='user_last_name',
            field=models.TextField(default='none'),
        ),
        migrations.AlterField(
            model_name='members',
            name='user_liked_posts',
            field=models.TextField(default='none'),
        ),
        migrations.AlterField(
            model_name='members',
            name='user_location',
            field=models.TextField(default='none'),
        ),
    ]