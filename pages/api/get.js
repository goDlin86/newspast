import faunadb, { query as q } from 'faunadb'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

export default async (req, res) => {
    const { theme, cursor } = req.query

    const client = new faunadb.Client({ secret: process.env.DBSECRET })
    
    let data = {}
    if (cursor) {
        const after = cursor.split('_')
        data = await client.query(
            q.Map(
                q.Paginate(
                    q.Match(q.Index('newsDesc'), theme), 
                    { 
                        size: 8,
                        after: [ after[0], q.Ref(q.Collection('NewsPast'), after[1]), q.Ref(q.Collection('NewsPast'), after[1]) ]
                    }
                ),
                q.Lambda((x, ref) => q.Get(ref))
            )
        )
    }
    else
        data = await client.query(
            q.Map(
                q.Paginate(
                    q.Match(q.Index('newsDesc'), theme), 
                    { size: 8 }
                ),
                q.Lambda((x, ref) => q.Get(ref))
            )
        )

    let news = data['data'].map(n => n['data'])
    news = news.map(n => {
        n.date = dayjs(n.date).format('DD MMM YYYY HH:MM')
        return n
    })

    let after = ''
    if (data['after'])
        after = data['after'][0] + '_' + data['after'][1]['value'].id
    
    res.status(200).json({ news, after })
}