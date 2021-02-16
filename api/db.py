from http.server import BaseHTTPRequestHandler
import requests
from lxml import etree
import json

import nltk
import pymorphy2

from faunadb import query as q
from faunadb.objects import Ref
from faunadb.client import FaunaClient
from datetime import datetime
import os


class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        m = pymorphy2.MorphAnalyzer()

        theme = 'world'
        url = 'https://news.google.com/news/rss/headlines/section/topic/'+theme.upper()+'.ru_ru/?ned=ru_ru&hl=ru'

        r = requests.get(url)
        xml = etree.XML(r.content)

        futr_news = []
        news = []
        for item in xml.find('channel').iterfind('item'):
            t = item.find('title').text
            pos = t.rfind(' - ')
            publisher = t[pos + 3:]
            title = t[:pos]
            news.append({
                'title': title,
                'link': item.find('link').text,
                'publisher': publisher,
                'date': item.find('pubDate').text,
                'theme': theme
            })

        for n in news:
            words = nltk.tokenize.word_tokenize(n['title'])
            for v in words:
                try:
                    p = m.parse(v)[0]
                    if p.tag.POS == 'VERB' and p.tag.tense == 'futr':
                        futr_news.append(n)
                except:
                    pass

        if len(futr_news) > 0:
            client = FaunaClient(secret=os.environ.get('DBSECRET'))

            client.query(
                q.map_(
                    lambda post: q.create(
                        q.collection("NewsPast"),
                        {"data": post}
                    ),
                    futr_news
                ))

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(futr_news).encode())
        return