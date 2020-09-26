from rest_framework import serializers
from .models import User, Post
from django.db import IntegrityError
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _

class GetAuthTokenSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(label=_("Password",),
        style={'input_type': 'password'},
        trim_whitespace=False)
            
    def validate(self, attrs):

        username = attrs["username"]
        password = attrs["password"]

        if username and password:
            user = authenticate(username=username, password=password)
            if user is None:

                raise serializers.ValidationError("Invalid credentials", code="authorization")

            else:
                attrs["user"] = user
                return attrs
        
        else: 
            raise serializers.ValidationError("Username or passwords field missing", code="authorization")

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.CharField()
    password = serializers.CharField(label=_("Password",),
        style={'input_type': 'password'},
        trim_whitespace=False)
    confirm = serializers.CharField(label=_("Confirm",),
        style={'input_type': 'password'},
        trim_whitespace=False)

    def validate(self, attrs):

        if attrs["confirm"] != attrs["password"]:
            raise serializers.ValidationError("Passwords must match", code="registration")
        
        try:
            user = User.objects.create_user(username=attrs["username"], email=attrs["email"], password=attrs["password"])
        except IntegrityError:
            raise serializers.ValidationError("User already exists", code="registratins")

        attrs["user"] = user
        return attrs

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email"]

class PostSerializer(serializers.ModelSerializer):
    poster = UserSerializer(read_only=True)
    date = serializers.ReadOnlyField(source="get_post_date", required=False)
    class Meta:
        model = Post
        fields = ["title", "content", "poster", "uuid", "date"]

    def create(self, attrs):
        return Post.objects.create(**attrs)