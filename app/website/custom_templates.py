# custom_filters.py
from django import template

register = template.Library()

@register.filter(name='split_tags')
def split_tags(value, delimiter=","):
    return value.split(delimiter)

