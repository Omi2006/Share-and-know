from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.humanize.templatetags import humanize

import uuid

class User(AbstractUser):
    pass

class Post(models.Model):
    title = models.CharField(max_length=64)
    content = models.CharField(max_length=2050)
    poster = models.ForeignKey(User, related_name="posts", on_delete=models.PROTECT)
    uuid = models.UUIDField(default=uuid.uuid1, unique=True)
    date = models.DateTimeField(auto_now_add=True)

    def get_post_date(self):
        
        return humanize.naturaltime(self.date)