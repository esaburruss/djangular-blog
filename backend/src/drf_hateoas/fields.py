import collections
import copy

from rest_framework.fields import DictField, CharField

class RelatedObject(object):
    name = None
    is_parent = False
    url = None
    def __init__(self, name, url, pk, is_parent=None):
        self.name = name
        self.url = url
        self.pk = pk
        if is_parent:
            this.is_parent=True

'''class HateoasUrlField(DictField):
    child = CharField()
    name = None
    is_parent = False
    url = None
    pk = None
    def __init__(self, name, url, pk, is_parent=None, *args, **kwargs):
        super(HateoasUrlField, self).__init__(*args, **kwargs)
        self.name = name
        self.url = url
        self.pk = pk
        if is_parent:
            this.is_parent=True'''
