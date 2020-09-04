from django.urls import path
from .views import Login, Overview, Register, Posts
from django.urls import path


urlpatterns = [
    path('' , Overview.as_view(), name = 'overview'),
    path('login/', Login.as_view(), name='login'),
    path('register/', Register.as_view(), name="register"),
    path('posts/', Posts.as_view(), name='posts')
]
