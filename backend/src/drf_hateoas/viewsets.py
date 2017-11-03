from rest_framework.viewsets import GenericViewSet
from django.urls import reverse

from drf_hateoas import mixins

class HateoasViewSet(GenericViewSet):

    def create_link(self, desc=None, obj=None, method=None, url=None):

        if url is None:
            url = self.request.build_absolute_uri(self.request.path)

        if obj:
            url += str(obj[self.lookup_field])

        if desc is None:
            desc = self.request.resolver_match.view_name

        result = {
            'desc': desc,
            'href': url,
        }
        if method:
            result['method'] = method

        return result

    def get_serializer_class(self):
        if self.action == 'list' and self.list_serializer_class:
            return self.list_serializer_class
        if self.action == 'create' and self.create_serializer_class:
            return self.create_serializer_class
        return self.serializer_class

    def get_serializer_context(self):
        context = super(HateoasViewSet, self).get_serializer_context()
        context['request'] = self.request
        return context


class HateoasModelViewSet(HateoasViewSet,
                          mixins.HateoasListMixin,
                          mixins.HateoasRetrieveMixin,
                          mixins.HateoasUpdateMixin,
                          mixins.HateoasCreateMixin,
                          mixins.HateoasDestroyMixin):
    pass
