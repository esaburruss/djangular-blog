from collections import OrderedDict

from django.core.urlresolvers import resolve

from rest_framework.response import Response
from rest_framework import status
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from rest_framework.reverse import reverse

from .pagination import ExtraLinksAwarePageNumberPagination

class HateoasListMixin(mixins.ListModelMixin):

    pagination_class = ExtraLinksAwarePageNumberPagination
    list_serializer_class = None

    def get_list_links(self, request):
        return [
            self.create_link(desc='Self', method='GET'),
            self.create_link(desc='New <TODO>', method='POST')
        ]

    def get_paginated_response(self, data, links=None):
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data, links)

    def linkify_list_data(self, request, data):
        for obj in data:
            obj['_links'] = [
                self.create_link('detail', obj, 'GET'),
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
    #def list(self, request, *args, **kwargs):
        #return super().list(self, request, *args, **kwargs)

class HateoasRetrieveMixin(mixins.RetrieveModelMixin):
    def get_retrieve_links(self):
        return [
            self.create_link(desc='Self', method='GET'),
            self.create_link(desc='Update self', method='PATCH'),
            self.create_link(desc='Delete self', method='DELETE'),
        ]

    def retrieve(self, request, *args, **kwargs):
        '''instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data
        data['_links'] = self.get_retrieve_links(request, instance)
        return Response(data)'''
        response = super().retrieve(self, request, *args, **kwargs)
        response.data['_links'] = self.get_retrieve_links()
        return response


class HateoasCreateMixin(mixins.CreateModelMixin):

    create_serializer_class = None
    #data = None

    def get_create_links(self, data):
        return [
            self.create_link(desc='Self', method='POST'),
            self.create_link(desc='Get Self', method='GET', obj=data),
            self.create_link(desc='Update self', method='PATCH', obj=data),
            self.create_link(desc='Delete self', method='DELETE', obj=data),
        ]

    def create(self, request, *args, **kwargs):
        '''serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        data = serializer.data
        data['_links'] = self.get_create_links(request, serializer.data)
        return Response(data, status=status.HTTP_201_CREATED, headers=headers)'''
        self.data = request.data
        response = super().create(self, request, *args, **kwargs)
        response.data['_links'] = self.get_create_links(response.data)
        return response


class HateoasUpdateMixin(mixins.UpdateModelMixin):

    update_serializer_class = None

    def get_update_links(self):
        return [
            self.create_link(desc='Self', method='PATCH'),
            self.create_link(desc='Get Self', method='GET'),
            self.create_link(desc='Delete self', method='DELETE'),
       ]

    def update(self, request, *args, **kwargs):
        '''partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        data = serializer.data
        data['_links'] = self.get_update_links(request, instance)
        return Response(data)'''
        self.data = request.data
        response = super().update(self, request, *args, **kwargs)
        response.data['_links'] = self.get_update_links()
        return response


class HateoasDestroyMixin(mixins.DestroyModelMixin):

    def get_destroy_links(self, request, instance):
        return {}

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        data = {'_links': self.get_destroy_links(request, instance)}
        self.perform_destroy(instance)
        return Response(data, status=status.HTTP_204_NO_CONTENT)
