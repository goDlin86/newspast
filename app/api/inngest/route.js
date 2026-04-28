import { Inngest } from 'inngest'
import { serve } from 'inngest/next'

const inngest = new Inngest({ id: 'newspast' })

const getNews = inngest.createFunction({ 
    id: 'Get news', 
    triggers: { cron: '0 */6 * * *' }
  }, 
  async ({ step }) => {
    await step.run('db world', async () => { return await get('world') })
    await step.run('db nation', async () => { return await get('nation') })
    await step.run('db scitech', async () => { return await get('scitech') })
  }
)

const get = async (theme) => {
  const res = await fetch('https://newspast.vercel.app/api/db?theme=' + theme + '&secret=' + process.env.SECRET_TOKEN)
  return await res.json()
}

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    getNews
  ],
})