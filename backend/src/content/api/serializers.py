from profiles.models import Profile
from profiles.api.serializers import ProfileDetailSerializer, ProfileListSerializer
from ..models import Blog, Category, Page, Section
from rest_framework import serializers


class PageListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = [
            'title',
            'slug',
        ]


class SectionListSerializer(serializers.ModelSerializer):
    nav_pages = PageListSerializer(many=True, read_only=True)
    class Meta:
        model = Section
        fields = [
            'title',
            'slug',
            'nav_pages',
        ]


class BlogDetailSerializer(serializers.ModelSerializer):
    author = ProfileDetailSerializer(read_only=True)
    class Meta:
        model = Blog
        fields = [
            'title',
            'slug',
            'body',
            'categories',
            'author',
        ]


class BlogListSerializer(serializers.ModelSerializer):
    author = ProfileListSerializer(read_only=True)
    class Meta:
        model = Blog
        fields = [
            'title',
            'slug',
            'author',
        ]


class CategoryDetailSerializer(serializers.ModelSerializer):
    #blogs = serializers.SerializerMethodField()
    blogs = BlogListSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = [
            'title',
            'slug',
            'blogs',
        ]


class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            'title',
            'slug',
        ]
