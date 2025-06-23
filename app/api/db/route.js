import { sql } from '@vercel/postgres'

export async function GET(request) {
  const { searchParams } = request.nextUrl
  const secret = searchParams.get('secret')

  if (secret !== process.env.SECRET_TOKEN) return Response.json({ error: 'Invalid token' }, { status: 401 })

  const theme = searchParams.get('theme')
  const r = await fetch('https://nextjs-flask-starter-sigma-five.vercel.app/api/db?theme=' + theme + '&secret=' + process.env.SECRET_TOKEN)
  const posts = await r.json()

  try {
    const res = await Promise.all(posts.map(async p => {
      const q = await sql`
        INSERT INTO newspast (title, link, publisher, date, theme)
        VALUES (${p.title}, ${p.link}, ${p.publisher}, ${p.date}, ${p.theme}) 
        ON CONFLICT (link) DO NOTHING
      `
      return { count: q.rowCount }
    }))

    return Response.json(res)
  }
  catch (e) {
    console.log(e)
    return Response.json({ message: e.message }, { status: 500 })
  }
}