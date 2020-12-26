from django.db import IntegrityError
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from .models import Hub, User, Post, Comment


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(
        label=_(
            'Password',
        ),
        style={'input_type': 'password'},
        trim_whitespace=False,
    )

    def validate(self, attrs):
        username = attrs['username']
        password = attrs['password']
        if username and password:
            user = authenticate(username=username, password=password)
            if user is None:
                raise serializers.ValidationError(
                    'Invalid credentials', code='authorization'
                )
            else:
                attrs['user'] = user
                return attrs
        else:
            raise serializers.ValidationError(
                'Username or password field missing', code='authorization'
            )


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.CharField()
    password = serializers.CharField(
        label=_(
            'Password',
        ),
        style={'input_type': 'password'},
        trim_whitespace=False,
    )
    confirm = serializers.CharField(
        label=_(
            'Confirm',
        ),
        style={'input_type': 'password'},
        trim_whitespace=False,
    )

    def validate(self, attrs):

        if attrs['confirm'] != attrs['password']:
            raise serializers.ValidationError(
                'Password and confirm must match!', code='registration'
            )
        try:
            user = User.objects.create_user(
                username=attrs['username'],
                email=attrs['email'],
                password=attrs['password'],
            )
        except IntegrityError:
            raise serializers.ValidationError(
                'Username is already taken!', code='registratins'
            )
        attrs['user'] = user
        return attrs


class UserSerializer(serializers.ModelSerializer):
    post_count = serializers.IntegerField(source="get_post_count")
    joined_hubs_count = serializers.IntegerField(source="get_joined_hubs_count")

    class Meta:
        model = User
        fields = ('id', 'username', 'post_count', 'joined_hubs_count')
        extra_kwargs = {'username': {'validators': []}}


class HubPostSerializer(serializers.ModelSerializer):
    poster = serializers.SlugRelatedField(read_only=True, slug_field='username')
    date = serializers.ReadOnlyField(source='get_date')
    path = serializers.ReadOnlyField(source='get_path')

    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'poster', 'uuid', 'date', 'path')


class PostSerializer(serializers.ModelSerializer):
    poster = serializers.SlugRelatedField(read_only=True, slug_field='username')
    likes = serializers.SlugRelatedField(
        slug_field='username', many=True, queryset=User.objects.all(), required=False
    )
    date = serializers.ReadOnlyField(source='get_date')

    extra_kwargs = {'likes': {'validators': []}}

    class Meta:
        model = Post
        fields = (
            'id',
            'title',
            'content',
            'poster',
            'uuid',
            'date',
            'comments',
            'likes',
            'hub',
        )

    def get_fields(self):
        fields = super(PostSerializer, self).get_fields()
        fields['comments'] = CommentSerializer(many=True, required=False)
        fields['hub'] = HubSerializer()
        return fields

    def create(self, validated_data):
        validated_data['hub'] = Hub.objects.get(pk=validated_data['hub']['id'])
        return Post.objects.create(**validated_data)

    def update(self, instance, validated_data):
        liker = validated_data['likes'][0]
        if liker in instance.likes.all():
            instance.likes.remove(liker)
        else:
            instance.likes.add(liker)
        return instance


class CommentSerializer(serializers.ModelSerializer):
    commenter = serializers.SlugRelatedField(read_only=True, slug_field='username')
    date = serializers.ReadOnlyField(source='get_date')

    class Meta:
        model = Comment
        fields = ('id', 'commenter', 'date', 'post', 'content')

    def create(self, validated_data):
        validated_data['post'] = Post.objects.get(id=int(validated_data['post']))
        return Comment.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.content = validated_data['content']
        instance.save()
        return instance


class HubSerializer(serializers.ModelSerializer):

    date = serializers.ReadOnlyField(source="get_date")
    full_path = serializers.ReadOnlyField(source="get_full_path")
    members = serializers.SlugRelatedField(
        slug_field='username', many=True, queryset=User.objects.all(), required=False
    )

    extra_kwargs = {'likes': {'validators': []}}

    class Meta:
        model = Hub
        fields = ('id', 'title', 'date', 'description', 'full_path', 'hub', 'members')

    def validate(self, attrs):
        hub = attrs.get('hub', None)
        if hub is None or not self.context.get('new_hub'):
            return super().validate(attrs)
        if Hub.objects.filter(hub=hub, title__iexact=attrs['title'].lower()).exists():
            raise serializers.ValidationError(
                f'There is already a hub with this title in {hub.title}!',
                code="unique_hub",
            )
        return super().validate(attrs)

    def create(self, validated_data, context):
        hub = Hub.objects.get(id=validated_data['hub'])
        validated_data['hub'] = hub
        if Hub.objects.filter(
            hub=hub, title__iexact=validated_data['title'].lower()
        ).exists():
            raise serializers.ValidationError(
                f'There is already a hub with this title in {hub.title}!',
                code="unique_hub",
            )
        return Hub.objects.create(**validated_data)

    def update(self, instance, validated_data):
        user = self.context['user']
        if instance in user.joined.all():
            user.joined.remove(instance)
        else:
            user.joined.add(instance)
        instance.save()
        return instance
