import json
import time
import requests
from datetime import datetime

browse_url = 'https://www.rottentomatoes.com/api/private/v2.0/browse?maxTomato=100&services=amazon%3Bhbo_go%3Bitunes%3Bnetflix_iw%3Bvudu%3Bamazon_prime%3Bfandango_now&certified=false&sortBy=release&type=dvd-streaming-all&page={}'

# using the headers of my browser
headers = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    'referer': 'https://www.rottentomatoes.com/browse/dvd-streaming-all?minTomato=0&maxTomato=100&services=amazon;hbo_go;itunes;netflix_iw;vudu;amazon_prime;fandango_now&genres=1;2;4;5;6;8;9;10;11;13;18;14&sortBy=release',
    'accept-language': 'en-US,en;q=0.9',
    'accept-encoding': 'gzip, deflate, br',
    'accept': '*/*'
}

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
    # text = "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UX182_CR0,0,182,268_AL_.jpg"
    # res = text.split('.')
    # res.remove(res[-2])
    # res = '.'.join(res)
    # print(res)
    # text = '19 July 2019 (USA)'
    # text = text.split('(', 1)[0]
    # text = text[:-1]
    # date = datetime.strptime(text, '%d %B %Y')
    # print(date)
