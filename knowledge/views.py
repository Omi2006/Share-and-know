import os
import logging
from django.http import request

from django.shortcuts import HttpResponse
from django.conf import settings
from django.views.generic import View
from django.contrib.auth import login, logout
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from .serializers import CommentSerializer, LoginSerializer, RegisterSerializer, PostSerializer, UserSerializer
from .models import Post, Comment

DEFAULT_PAGE = 1
DEFAULT_PAGE_SIZE = 9

class PostPagination(PageNumberPagination):
    page = DEFAULT_PAGE
    page_size = DEFAULT_PAGE_SIZE
    page_size_query_param = 'page_size'

    def get_paginated_response(self, data):
        return Response({
            'total': self.page.paginator.num_pages,
            'results': data
        })


class FrontendURL(View):
    def get(self, request):
        try:
            with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `yarn run build` to test the production version.
                """,
                status=501,
            )


class Login(generics.GenericAPIView):
    """
    Handle user login
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    #Get logged in user
    def get(self, request):
        if not request.user.is_authenticated:
            return Response({'user': None})
        else:
            return Response({'user': request.user.username})

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
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
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.validated_data['user']
            login(request, user)
            return Response({'username': user.username})

        return Response({'errors': serializer.errors})


class Posts(generics.ListCreateAPIView):
    """
    Gets posts paginated, creates posts, and updates posts
    """
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = PostPagination
    queryset = Post.objects.all().order_by('-date')
    
    def get(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.serializer_class(page, many=True)
            result = self.get_paginated_response(serializer.data)
            data = result.data # pagination data
        else:
            serializer = self.get_serializer(queryset, many=True)
            data = serializer.data
        return Response(data)
    
    def post(self, request):
        data = {**request.data, 'poster': request.user}
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.create(data)
            return Response({'message': 'posted successfully'})
        else:
            return Response({'errors': serializer.errors})
    
class OnePost(generics.RetrieveAPIView):
    """
    Get a specific post
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'uuid'

    def put(self, request, uuid):
        post = Post.objects.get(uuid=uuid)
        serializer = self.serializer_class(post, data={'likes': [{'username': request.user.username}]}, partial=True)
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
        serializer = self.serializer_class(comment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response('works')
        else:
            return Response({'errors': serializer.errors})


class Logout(generics.GenericAPIView):
    """
    Logout users
    """
    def get(self, request):
        logout(request)
        return Response({'message': 'success'})