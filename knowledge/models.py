import uuid
from datetime import datetime

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.humanize.templatetags.humanize import naturaltime


class User(AbstractUser):
    def get_post_count(self):
        return self.posts.count()

    def get_joined_hubs_count(self):
        return self.joined.count()


class Post(models.Model):
    title = models.CharField(max_length=64)
    content = models.TextField()
    poster = models.ForeignKey(
        User, related_name='posts', on_delete=models.SET_NULL, null=True
    )
    uuid = models.CharField(default='', unique=True, max_length=30)
    date = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name='posts_liked')
    hub = models.ForeignKey('Hub', on_delete=models.CASCADE, related_name='posts')

    def get_date(self) -> str:

        return naturaltime(self.date)

    def get_path(self) -> str:
        return self.hub.get_full_path()

    def save(self, *args, **kwargs):
        self.uuid = str(
            uuid.uuid5(
                uuid.NAMESPACE_URL,
                self.title
                + self.hub.title
                + datetime.now().strftime('%m%d%Y%H%M%S')
                + self.poster.username,
            )
        ).upper()
        super(Post, self).save(*args, **kwargs)


class Comment(models.Model):
    content = models.CharField(max_length=256)
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)
    commenter = models.ForeignKey(
        User, related_name='comments', on_delete=models.SET_NULL, null=True
    )
    date = models.DateTimeField(auto_now_add=True)

    def get_date(self) -> str:

        return naturaltime(self.date)

    class Meta:
        ordering = ('-date',)


class Hub(models.Model):
    title = models.CharField(max_length=20)
    date = models.DateTimeField(auto_now_add=True)
    hub = models.ForeignKey(
        'Hub',
        on_delete=models.CASCADE,
        related_name='sub_hubs',
        null=True,
        default=None,
    )
    members = models.ManyToManyField(User, related_name='joined')
    description = models.CharField(max_length=100)

    def get_date(self) -> str:

        return naturaltime(self.date)

    def get_full_path(self) -> str:
        """
        Goes through the parent hubs to get the full hub path with titles
        """
        # Start with an empty hub
        hub_path = []
        # Make the current hub the initial one
        hub = self
        # Keep going until we reach a main hub
        while hub.hub is not None:
            hub_path.append(hub.title)
            hub = hub.hub
        # Add the "source" hub as it will be skipped
        hub_path.append(hub.title)
        hub_path.reverse()
        # Return the hub path separated by /
        return '/'.join(hub_path)

    def __str__(self) -> str:
        return self.title
