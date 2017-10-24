from django.conf.urls import url
from django.contrib import admin

from .views import (
        get_home_page,
        get_nav,
        BlogDetailAPIView,
        BlogListAPIView,
        CategoryListAPIView,
        PageHtmlAPIView,
        SectionListCreateAPIView,
        PageInSectionAPIView,
        PageAPIDetailView,
        ContentImageAPIView,
    )

urlpatterns = [
    #Public
    url(r'^home/$', get_home_page, name='home'),
    url(r'^nav/$', get_nav, name='nav'),
    url(r'^blog/$', BlogListAPIView.as_view(), name='list'),
    url(r'^blog/(?P<slug>[\w-]+)/$', BlogDetailAPIView.as_view(), name='detail'),
    url(r'^category/$', CategoryListAPIView.as_view(), name='list'),
    url(r'^page/(?P<slug>[\w-]+)/$', PageHtmlAPIView.as_view(), name='detail'),
    #Admin/Protected
    url(r'^section/$', SectionListCreateAPIView.as_view()),
    url(r'^section/(?P<pk>[0-9]+)/page/$', PageInSectionAPIView.as_view()),
    url(r'^page/(?P<pk>[0-9]+)/image/$', ContentImageAPIView.as_view()),
    url(r'^page/(?P<pk>[0-9]+)/$', PageAPIDetailView.as_view()),
]
