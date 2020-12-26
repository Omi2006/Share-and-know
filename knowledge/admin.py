from django.contrib import admin
from .models import Post, Hub, Comment
# Register your models here.

admin.site.register(Post)
admin.site.register(Hub)
admin.site.register(Comment)