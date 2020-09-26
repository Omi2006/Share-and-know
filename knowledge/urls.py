from django.urls import path
from .views import Login, Register, Posts, New, OnePost
from django.urls import path


urlpatterns = [
    path('login', Login.as_view(), name='login'),
    path('register', Register.as_view(), name="register"),
    path('posts', Posts.as_view(), name='posts'),
    path('new/post', New.as_view(), name='new'),
    path('post', OnePost.as_view(), name='post')
]
