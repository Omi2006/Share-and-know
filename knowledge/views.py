from django.shortcuts import render, HttpResponse
from django.conf import settings
from rest_framework import generics, permissions
from django.views.generic import View
from rest_framework.response import Response
from .serializers import GetAuthTokenSerializer, RegisterSerializer, PostSerializer
from .models import User, Post
from django.contrib.auth import login, authenticate

import json
import os
import logging

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
    queryset = Post.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class New(generics.GenericAPIView):
    
    def post(self, request, *args, **kwargs):
        request.data["poster"] = request.user
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.create(request.data)
            return Response({'message': 'posted successfully'})