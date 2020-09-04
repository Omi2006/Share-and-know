from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import GetAuthTokenSerializer, RegisterSerializer, PostSerializer
from .models import User, Post
from django.contrib.auth import login, authenticate
from rest_framework.parsers import JSONParser

import json


class Overview(generics.GenericAPIView):
    api_urls = {
        'no api urls present at the time'
    }
    def get(self, request):
        return Response(self.api_urls)

class Login(generics.GenericAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = GetAuthTokenSerializer
    parser_classes = [JSONParser]

    def post(self, request, *args, **kwargs):
        serializer = GetAuthTokenSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token = Token.objects.get_or_create(user=user)[0]
            return Response({'token': token.key, 'username': user.username})

        return Response({'errors': serializer.errors})

class Register(generics.GenericAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={"request": request})
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token = Token.objects.get_or_create(user=user)[0]
            return Response({'token': token.key, 'username': user.username})

        return Response({'errors': serializer.errors})

class Posts(generics.ListCreateAPIView):

    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]