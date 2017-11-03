#from rest_framework.fields import UrlField
from django.urls import reverse, get_script_prefix, resolve

from rest_framework.serializers import ModelSerializer
from rest_framework.fields import SerializerMethodField, empty

from .fields import get_url_dict

class HateoasSerializer(ModelSerializer):
    base_url = None
    path = None
    #related = []
    #links=SerializerMethodField()
    def __init__(self, instance=None, data=empty, **kwargs):
        super(HateoasSerializer, self).__init__(instance, data, **kwargs)
        self.base_url = self.context['request'].scheme + '://' + self.context['request'].get_host()


    '''def get_hateoas_url(self, name, url, pk=None, is_parent=False, method='GET', *args, **kwargs):
        url = {
            'OBJECT': name,
            'URL': self.base_url + url,
            'METHOD': method,
            'IS_PARENT': is_parent
        }
        if pk:
            url['URL'] += '/' + str(pk)
        return url

    def to_representation(self, instance):
        json = super(HateoasSerializer, self).to_representation(instance)
        links = [get_url_dict('Self', self.context['request'].path, method=self.context['request'].method)]
        json.update({'links':links})
        json.move_to_end('links', last=True)
        return json

    def get_links(self, obj):
        return {}'''
