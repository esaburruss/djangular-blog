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


class PageListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = CONTENT_FIELDS

class ContentImageSerializer(serializers.ModelSerializer):
    x1 = serializers.IntegerField(write_only=True, required=False)
    y1 = serializers.IntegerField(write_only=True, required=False)
    x2 = serializers.IntegerField(write_only=True, required=False)
    y2 = serializers.IntegerField(write_only=True, required=False)
    pages = PageListSerializer(read_only=True, many=True)
    class Meta:
        model = ContentImage
        fields = CONTENT_FIELDS + [
            'pages',
            'image',
            'x1',
            'y1',
            'x2',
            'y2',
        ]

    def create(self, validated_data):
        img = super().create(validated_data)
        i = ContentImage.objects.get(slug=img.slug)
        for page in self.context['page']:
            print(page)
            page.images.add(i)
            page.save()
        
        return img

class BaseSerializer(serializers.ModelSerializer):

    '''def validate(self, instance):
        title = instance.get('title')
        slug = instance.get('slug')
        if title == None and slug == None:
            raise serializers.ValidationError('Name and Slug are blank')
        return instance'''



    class Meta:
        fields = CONTENT_FIELDS
        extra_kwargs = {
            'title': {'required': True},
            #'slug': {'read_only': True},
        }




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

class SectionDetailSerializer(BaseSerializer):
    class Meta(BaseSerializer.Meta):
        model = Section






class PageDetailSerializer(BaseSerializer):
    images = ContentImageSerializer(many=True, read_only=True)
    section = SectionDetailSerializer(read_only=True)

    def create(self, validated_data):
        '''print(self.context['section'])
        if self.context['section'].is_valid():
            print(self.context['section'].data)'''
        validated_data['section'] = self.context['section']
        return super().create(validated_data)
        '''else:
            print(self.context['section'].errors)
        return None'''


    class Meta:
        model = Page
        fields = BaseSerializer.Meta.fields + [
            'body',
            'images',
            'section',
        ]


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
