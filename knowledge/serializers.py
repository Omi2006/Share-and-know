from rest_framework import serializers
from .models import User, Post, Comment
from django.db import IntegrityError
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(label=_("Password",),
        style={'input_type': 'password'},
        trim_whitespace=False)

    def validate(self, attrs):
        username = attrs["username"]
        password = attrs["password"]
        print(username)

        if username and password:
            user = authenticate(username=username, password=password)
            if user is None:

                raise serializers.ValidationError("Invalid credentials", code="authorization")

            else:
                attrs["user"] = user
                return attrs
        
        else: 
            raise serializers.ValidationError("Username or password field missing", code="authorization")
    

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
        fields = ("username", "email")

class PostSerializer(serializers.ModelSerializer):
    poster = UserSerializer(read_only=True)
    date = serializers.ReadOnlyField(source="get_post_date", required=False)
    class Meta:
        model = Post
        fields = ("id", "title", "content", "poster", "uuid", "date", "comments")

    def get_fields(self):
        fields = super(PostSerializer, self).get_fields()
        fields["comments"] = CommentSerializer(many=True, required=False)
        return fields

    def create(self, validated_data):
        return Post.objects.create(**validated_data)

class CommentSerializer(serializers.ModelSerializer):
    commenter = UserSerializer(read_only=True)
    date = serializers.ReadOnlyField(source="get_post_date", required=False)

    class Meta:
        model = Comment
        fields = ("id", "commenter", "date", "post", "content")

    def create(self, validated_data):
        validated_data["post"] = Post.objects.get(id=int(validated_data["post"]))
        return Comment.objects.create(**validated_data)