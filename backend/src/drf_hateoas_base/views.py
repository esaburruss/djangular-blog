from collections import OrderedDict

from rest_framework.response import Response
from rest_framework import status
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin, DestroyModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework.pagination import PageNumberPagination
from rest_framework.reverse import reverse


class ExtraLinksAwarePageNumberPagination(PageNumberPagination):

    def get_paginated_response(self, data, links=[]):
        return Response(OrderedDict([
            ('count', self.page.paginator.count),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('results', data),
            ('_links', links),
        ]))

def create_link(desc, href, method=None):
    result = {
        'desc': desc,
        'href': href,
    }
    if method:
        result['method'] = method
    return result



class HateoasBaseMixin(GenericViewSet):
    def get_list_serializer(self):
        return None

    def get_base_serializer(self):
        return None

    def get_create_serializer(self):
        return None

    def get_object_name(self):
        return ''

    def get_parent_namespace(self):
        return ''

    def get_list_namespace(self):
        return '{}:{}-list'.format(
            self.get_parent_namespace(), self.get_object_name())

    def get_detail_namespace(self):
        print('{}:{}-detail'.format(
            self.get_parent_namespace(), self.get_object_name()))
        return '{}:{}-detail'.format(
            self.get_parent_namespace(), self.get_object_name())

    def get_serializer_class(self):
        print('Get Serializer Called')
        if self.action == 'list' and self.get_list_serializer is not None:
            return self.get_list_serializer()
        if self.action == 'create' and self.get_create_serializer() is not None:
            return self.get_create_serializer()
        if self.get_base_serializer() is not None:
            return self.get_serializer()
        return None

class HateoasListView(ListModelMixin, HateoasBaseMixin):
    pagination_class = ExtraLinksAwarePageNumberPagination

    def get_list_links(self, request):
        return [
            {
                'desc': 'Self',
                'href': request.build_absolute_uri(request.path),
                'method': 'GET',
            },
            {
                'desc': 'New ' + self.get_object_name(),
                'href': request.build_absolute_uri(request.path),
                'method': 'POST'
            }
        ]

    def get_paginated_response(self, data, links=None):
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data, links)

    def linkify_list_data(self, request, data):
        for obj in data:
            detail_link = request.build_absolute_uri(reverse(self.get_detail_namespace(), kwargs={'pk': obj['pk']}))
            obj['_links'] = [
                create_link(self.get_object_name() + ' detail', detail_link, 'GET'),
            ]
        return data

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            data = self.linkify_list_data(request, serializer.data)
            return self.get_paginated_response(data, links=self.get_list_links(request))

        serializer = self.get_serializer(queryset, many=True)
        data = self.linkify_list_data(request, serializer.data)


        return Response(OrderedDict([
            ('results', data),
            ('_links', self.get_list_links(request))
        ]))

class HateoasRetrieveView(RetrieveModelMixin, GenericViewSet):
    def get_retrieve_links(self, request, instance):
        self_link = request.build_absolute_uri(request.path)
        #image_link = request.build_absolute_uri(reverse('page-images-list', kwargs={'page_pk': instance.pk}))
        #memberlist_link = request.build_absolute_uri(reverse('band-members-list', kwargs={'page_pk': instance.pk}))

        return [
            create_link('Self', self_link, 'GET'),
            create_link('Update self', self_link, 'PUT'),
            create_link('Delete self', self_link, 'DELETE'),
            #create_link('List of images', image_link, 'GET'),
            #create_link('Add new image', image_link, 'POST'),
            #create_link('List of members', memberlist_link, 'GET'),
            #create_link('Add new member', memberlist_link, 'POST')
        ]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data
        data['_links'] = self.get_retrieve_links(request, instance)
        return Response(data)


class HateoasCreateView(CreateModelMixin, HateoasBaseMixin):
    def get_create_links(self, request, data):
        detail_link = request.build_absolute_uri(reverse(self.get_detail_namespace(), kwargs={'pk': data['pk']}))

        return [
            create_link('Detail of ' + self.get_object_name(), detail_link, 'GET')
        ]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        data = serializer.data
        data['_links'] = self.get_create_links(request, serializer.data)
        return Response(data, status=status.HTTP_201_CREATED, headers=headers)


class HateoasUpdateView(UpdateModelMixin, HateoasBaseMixin):
    def get_update_links(self, request, instance):
        detail_link = request.build_absolute_uri(reverse(self.get_detail_namespace(), kwargs={'pk': instance.pk}))

        return [
            create_link('Detail of ' + self.get_object_name(), detail_link, 'GET')
       ]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        data = serializer.data
        data['_links'] = self.get_update_links(request, instance)
        return Response(data)


class HateoasDestroyView(DestroyModelMixin, HateoasBaseMixin):
    def get_destroy_links(self, request, instance):
        return {}

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        data = {'_links': self.get_destroy_links(request, instance)}
        self.perform_destroy(instance)
        return Response(data, status=status.HTTP_204_NO_CONTENT)


class HateoasViewSet(
        HateoasListView,
        HateoasRetrieveView,
        HateoasUpdateView,
        HateoasCreateView,
        HateoasDestroyView):
    #queryset = Page.objects.all()
    #serializer_class = PageSerializer

    def get_create_links(self, request, data):
        detail_link = request.build_absolute_uri(reverse(self.get_detail_namespace(), kwargs={'pk': data['pk']}))

        return [
            create_link('Detail of ' + self.get_object_name(), detail_link, 'GET')
        ]

    def get_update_links(self, request, instance):
        detail_link = request.build_absolute_uri(reverse(self.get_detail_namespace(), kwargs={'pk': instance.pk}))

        return [
            create_link('Detail of ' + self.get_object_name(), detail_link, 'GET')
       ]
