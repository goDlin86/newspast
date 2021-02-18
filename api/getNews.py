from http.server import BaseHTTPRequestHandler
from faunadb import query as q
from faunadb.objects import Ref
from faunadb.client import FaunaClient
from datetime import datetime
import json
import os

class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        client = FaunaClient(secret=os.environ.get('DBSECRET'))

        content_len = int(self.headers['content-length'])
        post_body = self.rfile.read(content_len)
        data = json.loads(post_body)
        theme = data['theme']
        after = data['after']
        afterDate = data['afterDate']

        news = []
        if len(afterDate) == 0:
            news = client.query(
                q.map_(
                    lambda x: q.get(q.select(1, x)),
                    q.paginate(
                        q.match(q.index('newsDesc'), theme),
                        size=8
                    )
                )
            )
        else:
            if len(after) > 0:
                news = client.query(
                    q.map_(
                        lambda x: q.get(q.select(1, x)),
                        q.paginate(
                            q.match(q.index('newsDesc'), theme),
                            size=8,
                            after=[afterDate, q.ref(q.collection('NewsPast'), after), q.ref(q.collection('NewsPast'), after)]
                        )
                    )
                )

        n = []
        for new in news['data']:
            n.append(new['data'])

        after = ''
        if 'after' in news:
            afterDate = news['after'][0]
            after = news['after'][1].id()

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({ 'news': n, 'after': after, 'afterDate': afterDate }).encode())
        return