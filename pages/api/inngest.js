import { Inngest } from 'inngest'
import { serve } from 'inngest/next'

export const inngest = new Inngest({ name: 'newspast' })

const getNews = inngest.createFunction(
  { name: 'Get news' }, 
  { cron: '0 */6 * * *' }, 
  async ({ event, step }) => {
    await step.run('db world', () => get('world'))
    await step.run('db nation', () => get('nation'))
    await step.run('db scitech', () => get('scitech'))
  }
)

const get = async (theme) => {
  const res = await fetch('https://rednewsreader.vercel.app/api/db?theme=' + theme)//secret=' + process.env.SECRET_TOKEN)
  return await res.json()
}

export default serve(inngest, [ getNews ])