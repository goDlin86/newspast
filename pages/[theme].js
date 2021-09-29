import Layout from '../pages_lib/Layout'
import Nav from '../pages_lib/Nav'
import NewsList from '../pages_lib/NewsList'

import dayjs from 'dayjs'

const fetcher = url => fetch(url).then(res => res.json())

export default function Main(props) {
    return (
        <Layout>
            <Nav />
            <NewsList {...props} />
        </Layout>
    )
}

export async function getServerSideProps({ query }) {
    const baseUrl = 'https://newspast.vercel.app'//'http://localhost:3000'
    const dateStart = dayjs().endOf('month').toISOString().slice(0, -5)
    const data = await fetcher(baseUrl + `/api/get?theme=${query.theme}&dateStart=${dateStart}&dateEnd=`)
    return { props: { theme: query.theme, fallbackData: data } }
}