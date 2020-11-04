from os import name
from django.urls import path
from .views import Login, Register, Posts, OnePost, Comments, Logout


urlpatterns = [
    path('login', Login.as_view(), name='login'),
    path('register', Register.as_view(), name="register"),
    path('posts', Posts.as_view(), name='posts'),
    path('new/post', Posts.as_view(), name='new'),
    path('post/<str:uuid>', OnePost.as_view(), name='post'),
    path('comment/<int:id>', Comments.as_view(), name='edit'),
    path('comment', Comments.as_view(), name='comment'),
    path('logout', Logout.as_view(), name='logout')
]
