from ..items import MovieItem
from scrapy.spiders import CrawlSpider
from scrapy import Request

pagesize = 50
page = 5


class MovieSpider(CrawlSpider):
    name = 'imdb'
    allowed_domains = ['imdb.com']
    start_urls = []

    for i in range(0, page):
        start_url = 'https://www.imdb.com/search/title?' + 'title_type=feature' \
                    + '&count=' + str(pagesize) + '&start=' + str(pagesize * i + 1)
        start_urls.append(start_url)

    def parse(self, response):
        links = response.css('h3.lister-item-header a::attr(href)').extract()
        for link in links:
            yield response.follow(link, callback=self.parse_movie_detail_page)

    def parse_movie_detail_page(self, response):
        data = MovieItem()
        data['title'] = response.css('h1::text').extract_first().strip()
        data['user_rating'] = response.xpath('//span[contains(@itemprop, "ratingValue")]/text()').extract_first()
        data['amount_reviews'] = response.xpath('//span[contains(@itemprop, "ratingCount")]/text()').extract_first()
        data['poster'] = response.xpath('//div[contains(@class, "poster")]/a/img/@src').extract_first()
        countries = response.xpath(
            '//div[contains(@class, "txt-block") and contains(.//h4, "Country")]/a/text()').extract()
        data['countries'] = [country.strip() for country in countries]
        data['description'] = response.xpath(
            '//div[contains(@class, "summary_text")]/text()').extract_first().strip() or None
        languages = response.xpath(
            '//div[contains(@class, "txt-block") and contains(.//h4, "Language")]/a/text()').extract()
        data['languages'] = [language.strip() for language in languages]
        actors = response.xpath('//td[not(@class)]/a/text()').extract()
        data['actors'] = [actor.strip() for actor in actors]

        directors = response.xpath(
            "//div[contains(@class, 'credit_summary_item') and contains(.//h4, 'Director')]/a/text()").extract() or None
        if directors is None:
            data['directors'] = []
        else:
            data['directors'] = [director.strip() for director in directors]

        scriptwriters = response.xpath(
            "//div[contains(@class, 'credit_summary_item') and contains(.//h4, 'Writers')]/a/text()").extract() or None
        if scriptwriters is None:
            data['scriptwriters'] = []
        else:
            data['scriptwriters'] = [scriptwriter.strip() for scriptwriter in scriptwriters]

        data['runtime'] = response.xpath(
            "//div[contains(@class, 'txt-block') and contains(.//h4, 'Runtime')]/time/text()").extract_first() or None

        data['release_date'] = response.xpath(
            "//div[contains(@class, 'txt-block') and contains(.//h4, 'Release Date')]/text()").extract()[1] or None

        categories = response.xpath("//div[contains(.//h4, 'Genres')]/a/text()").extract()
        data['categories'] = [category.strip() for category in categories]

        img_link = "https://www.imdb.com/" + response.xpath(
            "//div[contains(@class, 'combined-see-more see-more')]/a/@href").extract_first()

        yield Request(url=img_link, meta={"data": data}, callback=self.parse_movie_photo)

    def parse_movie_photo(self, response):
        data = response.meta["data"]
        data['photos'] = response.xpath("//div[contains(@class, 'media_index_thumb_list')]/a/img/@src").extract()

        yield data


# response.xpath("//h3[contains(@class, 'title-and-badge style-scope ytd-video-renderer')]/a/@href").extract()
# response.css("h3.title-and-badge style-scope ytd-video-renderer").extract()