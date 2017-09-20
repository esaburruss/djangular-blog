from collections import OrderedDict
from core.models import Profile
from core.api.serializers import ProfileDetailSerializer, ProfileListSerializer
from ..models import Blog, Category, Page, Section, HtmlContent, ContentImage
from rest_framework import serializers
from rest_framework.relations import Hyperlink, PKOnlyObject

CONTENT_FIELDS = [
        'title',
        'slug',
        'is_visible',
        'creation_date',
        'changed_date',
    ]

HTML_CONTENT_FIELDS = CONTENT_FIELDS + [
        'body',
        'images',
    ]


class ContentImageSerializer(serializers.ModelSerializer):
    x1 = serializers.IntegerField(write_only=True)
    y1 = serializers.IntegerField(write_only=True)
    x2 = serializers.IntegerField(write_only=True)
    y2 = serializers.IntegerField(write_only=True)
    class Meta:
        model = ContentImage
        fields = CONTENT_FIELDS + [
            'image',
            'x1',
            'y1',
            'x2',
            'y2',
        ]
class HtmlPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = [
            'body',
        ]


class HtmlBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = [
            'body',
            'categories',
        ]

class SectionDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = CONTENT_FIELDS


class PageDetailSerializer(serializers.ModelSerializer):
    images = ContentImageSerializer(many=True)
    section = SectionDetailSerializer(read_only=False)
    class Meta:
        model = Page
        fields = HTML_CONTENT_FIELDS + [
            'section',
        ]

class PageListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = CONTENT_FIELDS

class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            'title',
            'slug',
        ]


class BlogDetailSerializer(serializers.ModelSerializer):
    author = ProfileDetailSerializer(read_only=True)
    images = ContentImageSerializer(many=True)
    categories = CategoryListSerializer(read_only=False, many=True)
    class Meta:
        model = Blog
        fields = HTML_CONTENT_FIELDS + [
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
            'creation_date',
            'author',
        ]


class CategoryDetailSerializer(serializers.ModelSerializer):
    blogs = BlogListSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = [
            'title',
            'slug',
            'blogs',
        ]

class NavbarPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = [
            'title',
            'slug',
        ]


class NavbarSerializer(serializers.ModelSerializer):
    pages = serializers.SerializerMethodField('get_nav_pages')
    #pages = NavbarPageSerializer(many=True, read_only=True, required=False)

    title = serializers.SerializerMethodField('get_nav_title')
    slug = serializers.SerializerMethodField('get_nav_slug')
    class Meta:
        model = Section
        fields = [
            'title',
            'slug',
            'pages',
        ]
    def to_representation(self, instance):
        result = super(NavbarSerializer, self).to_representation(instance)
        return OrderedDict([(key, result[key]) for key in result if result[key] is not None])

    def get_nav_title(self, obj):
        return obj.nav_title()

    def get_nav_slug(self, obj):
        return obj.nav_slug()

    def get_nav_pages(self, obj):
        if obj.not_dropdown():
            return None
        else:
            return NavbarPageSerializer(obj.nav_pages(), many=True).data
