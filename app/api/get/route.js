import { NextResponse } from 'next/server'
import faunadb, { query as q } from 'faunadb'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

export async function GET(request) {
  const { searchParams } = request.nextUrl
  const theme = searchParams.get('theme')
  const dateStart = searchParams.get('dateStart')
  const dateEnd = searchParams.get('dateEnd')
  const cursor = searchParams.get('cursor')

  const client = new faunadb.Client({ secret: process.env.DBSECRET })
  
  const a = cursor ? cursor.split('_') : []
  const afterQ = a.length ? [a[0], q.Ref(q.Collection('NewsPast'), a[1]), q.Ref(q.Collection('NewsPast'), a[1])] : []

  const data = await client.query(
    q.Map(
      q.Paginate(
        q.Range(q.Match(q.Index('newsDesc'), theme), dateStart || '', dateEnd || ''),
        { 
          size: 8,
          after: afterQ
        }
      ),
      q.Lambda((x, ref) => q.Get(ref))
    )
  )

  let news = data['data'].map(n => n['data'])
  news = news.map(n => {
    n.date = dayjs(n.date).format('DD MMM YYYY HH:mm')
    return n
  })

  let after = ''
  if (data['after'])
    after = data['after'][0] + '_' + data['after'][1]['value'].id
  
  return NextResponse.json({ news, after })
}