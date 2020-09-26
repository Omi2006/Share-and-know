from django.shortcuts import render, HttpResponse
from django.conf import settings
from rest_framework import generics, permissions
from django.views.generic import View
from rest_framework import serializers
from rest_framework.response import Response
from .serializers import GetAuthTokenSerializer, RegisterSerializer, PostSerializer
from .models import User, Post
from django.contrib.auth import login, authenticate
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from copy import deepcopy

DEFAULT_PAGE = 1
DEFAULT_PAGE_SIZE = 10

import json
import os
import logging

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

    permission_classes = [permissions.AllowAny]
    serializer_class = GetAuthTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = GetAuthTokenSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            login(request, user)
            return Response({'username': user.username})

        return Response({'errors': serializer.errors})

class Register(generics.GenericAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={"request": request})
        if serializer.is_valid():
            user = serializer.validated_data['user']
            login(request, user)
            return Response({'username': user.username})

        return Response({'errors': serializer.errors})

class Posts(generics.ListAPIView):
    
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = PostPagination
    queryset = Post.objects.all()
    
    def get(self, request):
        queryset = self.filter_queryset(self.queryset)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.serializer_class(page, many=True)
            result = self.get_paginated_response(serializer.data)
            data = result.data # pagination data
        else:
            serializer = self.get_serializer(queryset, many=True)
            data = serializer.data
        return Response(data)

class New(generics.GenericAPIView):
    
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = deepcopy(request.data)
        data["poster"] = request.user
        serializer = self.serializer_class(data=data)
        if serializer.is_valid():
            serializer.create(data)
            return Response({'message': 'posted successfully'})
        else:
            print(serializer.errors)
            return Response({'error': serializer.errors})

class OnePost(generics.GenericAPIView):

    serializer_class = PostSerializer
    
    def get(self, request):
        uuid = request.query_params["uuid"]
        post = Post.objects.get(uuid=uuid)
        serializer = self.serializer_class(post)
        return Response(serializer.data)