from os import name
from django.urls import path
from .views import Login, Register, Posts, OnePost, Comment, Logout
from django.urls import path


urlpatterns = [
    path('login', Login.as_view(), name='login'),
    path('register', Register.as_view(), name="register"),
    path('posts', Posts.as_view(), name='posts'),
    path('new/post', Posts.as_view(), name='new'),
    path('post', OnePost.as_view(), name='post'),
    path('new/comment', Comment.as_view(), name='post'),
    path('logout', Logout.as_view(), name='logout')
]
