import json
import time
import requests
from datetime import datetime

# browse_url = 'https://www.rottentomatoes.com/api/private/v2.0/browse?maxTomato=100&services=amazon%3Bhbo_go%3Bitunes%3Bnetflix_iw%3Bvudu%3Bamazon_prime%3Bfandango_now&certified=false&sortBy=release&type=dvd-streaming-all&page={}'

# using the headers of my browser
headers = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    'accept-language': 'en-US,en;q=0.9',
    'accept-encoding': 'gzip, deflate, br',
    'accept': '*/*'
}

browse_url = "http://api.themoviedb.org/3/find/{}?api_key=401a2a59f21893d7f5cfa3c4a45bb4ac&external_source=imdb_id"
# if __name__ == '__main__':
#     movies = []
#     for page in range(1, 2):
#         url = browse_url.format(page)
#
#         print('retrieving page: {}'.format(page))
#         response = requests.get(url, headers=headers)
#         data = json.loads(response.text)
#         retrieved_movies = data['results']
#         movies.extend(retrieved_movies)
#
#         # being nice and throttling my requests
#         time.sleep(2)
#
#     with open('movies.json', 'w') as f:
#         json.dump(movies, f)
#         # f.write('\n'.join(json.dumps(x) for x in retrieved_movies))

# if __name__ == '__main__':
#     movie = {}
#     url = "https://api.themoviedb.org/3/find/tt8228288?api_key=401a2a59f21893d7f5cfa3c4a45bb4ac&external_source=imdb_id"
#     response = requests.get(url, headers=headers)
#     data = json.loads(response.text)
#     video_url = "http://api.themoviedb.org/3/movie/{}?append_to_response=videos&api_key=401a2a59f21893d7f5cfa3c4a45bb4ac"
#     video_url = video_url.format(data['movie_results'][0]['id'])
#     response = requests.get(video_url, headers=headers)
#     data = json.loads(response.text)
#     print(data['videos']['results'][0]['key'])
