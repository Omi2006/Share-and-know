import os

from django.shortcuts import HttpResponse
from django.conf import settings
from django.views.generic import View
from django.contrib.auth import login, logout
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .serializers import HubSerializer, CommentSerializer, LoginSerializer, RegisterSerializer, PostSerializer, UserSerializer
from .models import Hub, Post, Comment

DEFAULT_PAGE = 1
DEFAULT_PAGE_SIZE = 6


class ItemPagination(PageNumberPagination):
    page = DEFAULT_PAGE
    page_size = DEFAULT_PAGE_SIZE
    page_size_query_param = 'page_size'

    def get_paginated_response(self, data):
        return Response({
            'total': self.page.paginator.num_pages,
            'results': data
        })


@method_decorator(cache_page(None), name='dispatch')
class FrontendURL(View):
    """
    Render the frontend
    """

    def get(self, request):
        with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
            return HttpResponse(f.read())


@method_decorator(cache_page(None), name='dispatch')
class FileView(View):
    """
    Renders a file like the site.webmanifest to make the app progressive.
    """

    def get(self, request, file):
        with open(os.path.join(settings.REACT_APP_DIR, 'build', file), 'rb') as f:
            return HttpResponse(f.read())


class Login(generics.GenericAPIView):
    """
    Handle user login
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    # Get logged in user
    def get(self, request):
        if not request.user.is_authenticated:
            return Response({'user': None})
        else:
            return Response({'user': request.user.username})

    def post(self, request):
        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.validated_data['user']
            login(request, user)
            return Response({'username': user.username})
        return Response({'errors': serializer.errors})


class Register(generics.GenericAPIView):
    """
    Handle user registration
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.validated_data['user']
            login(request, user)
            return Response({'username': user.username})

        return Response({'errors': serializer.errors})


class NewPost(generics.CreateAPIView):
    """
    Creates a new post
    """
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Post.objects.all()

    def post(self, request):
        data = {**request.data, 'poster': request.user}
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.create(data)
            return Response({'message': 'posted successfully'})
        else:
            return Response({'errors': serializer.errors})


class HubItems(generics.ListAPIView):

    pagination_class = ItemPagination
    paginate_by = 6

    def get_queryset(self):
        type = Post
        if self.request.query_params['type'] == 'hubs':
            type = Hub
        return type.objects.filter(hub=self.kwargs['id'], title__icontains=self.request.query_params['search']).order_by(self.request.query_params['sort'])

    def get_serializer_class(self):
        return PostSerializer if self.request.query_params['type'] == 'posts' else HubSerializer


class OnePost(generics.RetrieveAPIView):
    """
    Get a specific post
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'uuid'

    def put(self, request, uuid):
        post = Post.objects.get(uuid=uuid)
        serializer = self.serializer_class(
            post, data={'likes': [{'username': request.user.username}]}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'likes': UserSerializer(post.likes.all(), many=True).data})
        else:
            return Response({'errors': serializer.errors})


class Comments(generics.UpdateAPIView):
    """
    Create and edit comments
    """
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Comment.objects.all()
    lookup_field = 'id'

    def post(self, request):
        data = {
            'commenter': request.user,
            'post': str(request.data['post']),
            'content': request.data['content']
        }
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            comment = serializer.create(data)
            return Response({'comment': self.serializer_class(comment).data})
        else:
            return Response({'errors': serializer.errors})

    def put(self, request, id):
        comment = Comment.objects.get(id=id)
        if comment.commenter != request.user:
            return Response({'errors': {'comment': 'You can not edit this post!'}})
        serializer = self.serializer_class(
            comment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Comment edited successfully'})
        else:
            return Response({'errors': serializer.errors})


class OneHub(generics.RetrieveAPIView):
    """
    Get all details of a specific hub
    """
    queryset = Hub.objects.all()
    serializer_class = HubSerializer
    lookup_field = 'title'


class Logout(generics.GenericAPIView):
    """
    Logout users
    """

    def get(self, request):
        logout(request)
        return Response({'message': 'success'})
