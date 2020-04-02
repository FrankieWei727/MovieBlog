from movie.models import Movie, Category, CategoryGroup, StillsGallery
from datetime import datetime


def clean_title(param):
    return param


def clean_poster(param):
    param = param.split('.')
    param.remove(param[-2])
    param = '.'.join(param)
    return param


def clean_countries(param):
    if param:
        param = ' '.join(param)
    return param


def clean_user_rating(param):
    param = float(param) / 2
    return param


def clean_runtime(param):
    param = param.split("m", 1)[0]
    return param


def clean_amount_reviews(param):
    param = param.split(',')
    param = ''.join(param)
    return param


def clean_scriptwriters(param):
    if param:
        return ','.join(param)


def clean_directors(param):
    if param:
        return ','.join(param)


def clean_actors(param):
    if param:
        return ','.join(param)


def clean_languages(param):
    if param:
        return ','.join(param)


def clean_release_date(param):
    if param:
        param = param.split('(', 1)[0]
        param = param[1:-1]
        param = datetime.strptime(param, '%d %B %Y')
    return param


def clean_categories(param):
    group = CategoryGroup.objects.get(name='Genre')
    for item in param:
        Category.objects.update_or_create(
            name=item,
            defaults={
                'group': group
            }
        )
    return param


class CrawlingPipeline(object):
    def process_item(self, item, spider):
        title = clean_title(item['title'])
        user_rating = clean_user_rating(item['user_rating'])
        amount_reviews = clean_amount_reviews(item['amount_reviews'])
        poster = clean_poster(item['poster'])
        countries = clean_countries(item['countries'])
        description = item['description']
        languages = clean_languages(item['languages'])
        actors = clean_actors(item['actors'])
        directors = clean_directors(item['directors'])
        scriptwriters = clean_scriptwriters(item['scriptwriters'])
        release_date = clean_release_date(item['release_date'])
        runtime = clean_runtime(item['runtime'])
        categories = clean_categories(item['categories'])
        photos = item['photos']

        Movie.objects.update_or_create(
            title=title,
            defaults={
                'user_rating': user_rating,
                'poster': poster,
                'amount_reviews': amount_reviews,
                'countries': countries,
                'languages': languages,
                'actors': actors,
                'description': description,
                'scriptwriters': scriptwriters,
                'directors': directors,
                'release_date': release_date,
                'runtime': runtime,
            }
        )

        movie = Movie.objects.get(title=title)
        for category in categories:
            category = Category.objects.get(name=category)
            movie.categories.add(category)
        if len(photos) > 10:
            photos = photos[0:10]
        for photo in photos:
            photo = photo.split('.')
            photo.remove(photo[-2])
            photo = '.'.join(photo)
            StillsGallery.objects.update_or_create(
                photo=photo,
                defaults={
                    'movie': movie
                }
            )

        return item
