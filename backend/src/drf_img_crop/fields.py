from django.utils.translation import ugettext_lazy as _

from rest_framework import serializers

EMPTY_VALUES = (None, '')


class ImageBoundsField(serializers.Field):
    """
    A field for a pair of x,y coordinates. Format is x1,y1,x2,y2
    """
    type_name = 'ImageBoundsField'
    type_label = 'imageBounds'

    default_error_messages = {
        'invalid': _('Enter a valid x1,y1,x2,y2 coordinate pair.'),
        'boundsX': _('Coordinates out of bounds. x1 must be less than x2, and y1 must be less than y2'),
        'boundsY': _('Coordinates out of bounds. y1 must be less than y2'),
    }

    def to_internal_value(self, value):
        """
        Parse json data and return a point object
        """
        if value in EMPTY_VALUES and not self.required:
            return None

        if value.count(',') == 3:
            try:
                value = tuple( int(i) for i in value.split(',') )
            except (ValueError):
                self.fail('invalid')
            if value[0] >= value[2]:
                self.fail('boundsX')
            if value[1] >= value[3]:
                self.fail('boundsY')
            return value
        self.fail('invalid')

    def to_representation(self, value):
        return value
