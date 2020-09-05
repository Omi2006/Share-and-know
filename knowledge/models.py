from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    pass

class Post(models.Model):
    title = models.CharField(max_length=64)
    content = models.CharField(max_length=2050)
    poster = models.ForeignKey(User, related_name="posts", on_delete=models.PROTECT)