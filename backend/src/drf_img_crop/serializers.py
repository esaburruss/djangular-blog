from collections import OrderedDict
from io import BytesIO
import sys

from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework import serializers
from PIL import Image

from .fields import ImageBoundsField

class ImageCreateSerializer(serializers.ModelSerializer):
    crop = ImageBoundsField(required = False)
    img_field = 'image'

    def create(self, validated_data):
        if 'crop' in validated_data:
            img = Image.open(validated_data[self.img_field])
            img2 = img.crop(validated_data['crop'])
            format = None
            format2 = None
            ext = None
            if img2.mode == 'RGBA':
                format = 'PNG'
                format2 = 'image/png'
                ext = '.png'
            else:
                format - 'JPEG'
                format2 = 'image/jpeg'
                ext = '.jpg'
            new_image_io = BytesIO()
            img2.save(new_image_io, format=format, quality=90)
            validated_data['image'] = InMemoryUploadedFile(new_image_io, None, validated_data['slug']+ext, format2,
                                      sys.getsizeof(new_image_io), None)
            del validated_data['crop']
        return super().create(validated_data)
