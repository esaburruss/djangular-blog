import re

from django.db.models import Q
from django.db import DataError

from rest_framework.exceptions import ValidationError
from rest_framework.validators import UniqueValidator, qs_filter, qs_exists

class TitleValidator(UniqueValidator):
    def __call__(self, value):
        queryset = self.queryset
        slug = re.sub(r'[^\w]', '', value.replace(' ', '_').lower())
        queryset = self.filter_queryset(value, slug, queryset)
        queryset = self.exclude_current_instance(queryset)
        if qs_exists(queryset):
            #q1 = queryset.filter(Q(title__exact=value))
            #q2 = queryset.filter(Q(slug__exact=slug))
            if qs_exists(queryset.filter(Q(title__exact=value))):
                raise ValidationError(self.message, code='unique')
            elif qs_exists(queryset.filter(Q(slug__exact=slug))):
                raise ValidationError('Non Unique Slug Generated: ' +slug, code='unique')

        #raise ValidationError('You Suck', code='unique')

    #Override
    def filter_queryset(self, value, slug, queryset):
        try:
            return queryset.filter(Q(title__exact=value) | Q(slug__exact=slug))
        except (TypeError, ValueError, DataError):
            return queryset.none()
