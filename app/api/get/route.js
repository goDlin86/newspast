import { sql } from '@vercel/postgres'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

export async function GET(request) {
  const { searchParams } = request.nextUrl
  const theme = searchParams.get('theme')
  const dateStart = searchParams.get('dateStart')
  const dateEnd = searchParams.get('dateEnd')
  const offset = searchParams.get('offset')
 
  try {
    const data = await sql`
      SELECT * FROM newspast 
      WHERE theme = ${theme} AND date BETWEEN ${dateStart} AND ${dateEnd} 
      ORDER BY date DESC LIMIT 8 OFFSET ${offset}
    `
    return Response.json(data.rows)
  }
  catch (e) {
    console.log(e)
    return Response.json({ message: e.message }, { status: 500 })
  }
}