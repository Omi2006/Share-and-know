import uuid

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.humanize.templatetags.humanize import naturaltime


class User(AbstractUser):
    pass


class Post(models.Model):
    title = models.CharField(max_length=64)
    content = models.TextField()
    poster = models.ForeignKey(
        User, related_name='posts', on_delete=models.SET_NULL, null=True)
    uuid = models.CharField(default=uuid.uuid4(
    ).hex[:9].upper(), unique=True, max_length=9)
    date = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='posts_liked')
    category = models.ForeignKey(
        'Category', on_delete=models.CASCADE, related_name='posts')

    def get_date(self):

        return naturaltime(self.date)


class Comment(models.Model):
    content = models.CharField(max_length=256)
    post = models.ForeignKey(
        Post, related_name='comments', on_delete=models.CASCADE)
    commenter = models.ForeignKey(
        User, related_name='comments', on_delete=models.SET_NULL, null=True)
    date = models.DateTimeField(auto_now_add=True)

    def get_date(self):

        return naturaltime(self.date)


class Category(models.Model):
    title = models.CharField(max_length=20)
    date = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(
        'Category', on_delete=models.CASCADE, related_name='sub_categories', null=True)

    def get_date(self):

        return naturaltime(self.date)
