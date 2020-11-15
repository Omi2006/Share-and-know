from django.urls import path
from .views import FileView, Login, OneCategory, Register, OnePost, Comments, Logout, CategoryItems, NewPost


urlpatterns = [
    path('login', Login.as_view(), name='login'),
    path('register', Register.as_view(), name="register"),
    path('file/<str:file>', FileView.as_view()),
    path('new/post', NewPost.as_view(), name='new'),
    path('post/<str:uuid>', OnePost.as_view(), name='post'),
    path('comment/<int:id>', Comments.as_view(), name='edit'),
    path('comment', Comments.as_view(), name='comment'),
    path('category/details/<str:title>', OneCategory.as_view(), name='category'),
    path('category/items/<int:id>', CategoryItems.as_view()),
    path('logout', Logout.as_view(), name='logout'),
]
