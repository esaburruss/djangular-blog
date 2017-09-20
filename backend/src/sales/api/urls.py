from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^project/(?P<project>[0-9])/$', views.getProject, name='project'),
]
