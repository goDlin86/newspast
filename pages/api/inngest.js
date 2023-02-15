import { Inngest } from 'inngest'
import { serve } from 'inngest/next'

export const inngest = new Inngest({ name: 'newspast' })

const getNews = inngest.createFunction(
  { name: 'Get news' }, 
  { cron: '0 */6 * * *' }, 
  async ({ event, step }) => {
    // await step.run('db world', async () => { return await get('world') })
    // await step.run('db nation', async () => { return await get('nation') })
    // await step.run('db scitech', async () => { return await get('scitech') })
    const res = await fetch('https://newspast.vercel.app/api/db?theme=world')// + '&secret=' + process.env.SECRET_TOKEN)
    return await res.json()
  }
)

// const get = async (theme) => {
//   const res = await fetch('https://newspast.vercel.app/api/db?theme=' + theme)// + '&secret=' + process.env.SECRET_TOKEN)
//   return await res.json()
// }

export default serve(inngest, [ getNews ])