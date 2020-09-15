from django.urls import path
from .views import Login, Register, Posts, New
from django.urls import path


urlpatterns = [
    path('login', Login.as_view(), name='login'),
    path('register', Register.as_view(), name="register"),
    path('posts', Posts.as_view(), name='posts'),
    path('new/post', New.as_view(), name='new')
]
