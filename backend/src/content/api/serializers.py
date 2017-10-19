from collections import OrderedDict
from io import BytesIO
import sys


from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework import serializers
from rest_framework.relations import Hyperlink, PKOnlyObject
from PIL import Image

from core.models import Profile
from core.api.serializers import ProfileDetailSerializer, ProfileListSerializer
from ..models import Blog, Category, Page, Section, HtmlContent, ContentImage


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
    pages = PageListSerializer(read_only=True, many=True)
    class Meta:
        model = ContentImage
        fields = CONTENT_FIELDS + [
            'pages',
            'image',
        ]
        extra_kwargs = {
            'image': {'read_only': True},
        }

    '''def create(self, validated_data):
        img = super().create(validated_data)
        i = ContentImage.objects.get(slug=img.slug)
        for page in self.context['page']:
            print(page)
            page.images.add(i)
            page.save()

        return img'''

class ContentImageCreateSerializer(serializers.ModelSerializer):
    x1 = serializers.IntegerField(write_only=True, required=False)
    y1 = serializers.IntegerField(write_only=True, required=False)
    x2 = serializers.IntegerField(write_only=True, required=False)
    y2 = serializers.IntegerField(write_only=True, required=False)
    class Meta:
        model = ContentImage
        fields = CONTENT_FIELDS + [
            'image',
            'x1',
            'y1',
            'x2',
            'y2',
        ]
        extra_kwargs = {
            'image': {'required': True},
        }
    '''def save(self):

        print(self['image'])'''

    def create(self, validated_data):
        if 'x1' in validated_data and 'y1' in validated_data and 'x2' in validated_data and 'y2' in validated_data:
            if validated_data['x1'] > 0 and validated_data['y1'] > 0 and validated_data['x2'] > validated_data['x1'] and validated_data['y2'] > validated_data['y1']:
                print(validated_data['image'])
                img = Image.open(validated_data['image'])
                print(img)
                img2 = img.crop((validated_data['x1'],validated_data['y1'],validated_data['x2'],validated_data['y2']))
                new_image_io = BytesIO()
                print(img2)
                img2.save(new_image_io, format='JPEG', quality=90)
                validated_data['image'] = InMemoryUploadedFile(new_image_io, None, validated_data['slug']+'.jpg', 'image/jpeg',
                                          sys.getsizeof(new_image_io), None)
            del validated_data['x1'],validated_data['y1'],validated_data['x2'],validated_data['y2']
        return super().create(validated_data)


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
