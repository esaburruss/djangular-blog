import collections
import copy

from rest_framework.fields import DictField, CharField
from rest_framework.relations import HyperlinkedRelatedField

def get_url_dict(name, url, lookup=None, method='GET', many=False):
    dict = {
        'NAME': name,
        'URL': url,
        'METHOD': method,
        'MANY': many
    }
    if lookup:
        dict['LOOKUP'] = lookup

    return dict
class HateoasUrlField(HyperlinkedRelatedField):
    child = CharField()
    name = None
    method = 'GET'
    many = False

    def __init__(self, name, method=None, *args, **kwargs):
        super(HateoasUrlField, self).__init__(*args, **kwargs)
        self.name = name
        if method:
            self.method = method
        #if many:
            #self.many = many


    def to_representation(self, value):
        url = super(HateoasUrlField,self).to_representation(value)
        return get_url_dict(self.name, url, lookup=value.__str__(), method=self.method, many=self.many)
