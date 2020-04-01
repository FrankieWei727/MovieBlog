# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy
from scrapy_djangoitem import DjangoItem
from movie.models import Movie


class MovieItem(DjangoItem):
    django_model = Movie
    categories = scrapy.Field()
    photos = scrapy.Field()
