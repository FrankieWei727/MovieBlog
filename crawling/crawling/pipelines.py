import json
import requests
from movie.models import Movie, Category, CategoryGroup, StillsGallery
from datetime import datetime

# using the headers of my browser
headers = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    'accept-language': 'en-US,en;q=0.9',
    'accept-encoding': 'gzip, deflate, br',
    'accept': '*/*'
}


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

        browse_url = "https://api.themoviedb.org/3/find/{}?api_key=401a2a59f21893d7f5cfa3c4a45bb4ac&external_source=imdb_id"
        url = browse_url.format(item['imdb_id'])
        response = requests.get(url, headers=headers)
        data = json.loads(response.text)
        video_url = "http://api.themoviedb.org/3/movie/{}?append_to_response=videos&api_key=401a2a59f21893d7f5cfa3c4a45bb4ac"
        video_url = video_url.format(data['movie_results'][0]['id'])
        response = requests.get(video_url, headers=headers)
        video_data = json.loads(response.text)
        trailer = 'https://www.youtube.com/embed/' + video_data['videos']['results'][0]['key']

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
                'trailer': trailer,
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
