from django.urls import path
from .views import (
    FileView,
    Login,
    OneHub,
    Register,
    OnePost,
    Comments,
    Logout,
    HubItems,
    NewPost,
    NewHub,
    Joined,
)


urlpatterns = [
    path('login', Login.as_view(), name='login'),
    path('register', Register.as_view(), name='register'),
    path('file/<str:file>', FileView.as_view()),
    path('new/post', NewPost.as_view(), name='new_post'),
    path('new/hub', NewHub.as_view(), name='new_hub'),
    path('post/<str:uuid>', OnePost.as_view(), name='post'),
    path('comment/<int:id>', Comments.as_view(), name='edit'),
    path('comment', Comments.as_view(), name='comment'),
    path('hub/details/<str:title>', OneHub.as_view(), name='hub'),
    path('hub/items/<int:id>', HubItems.as_view()),
    path('logout', Logout.as_view(), name='logout'),
    path('joined', Joined.as_view(), name='joined'),
]
