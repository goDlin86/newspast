import NewsList from '../../pages_lib/NewsList'

export default function Page({ params }) {
    return (
        <NewsList theme={params.theme} />
    )
}

// export async function getServerSideProps({ query }) {
//     const baseUrl = 'https://newspast.vercel.app'//'http://localhost:3000'
//     const dateStart = dayjs().endOf('month').toISOString().slice(0, -5)
//     const data = await fetcher(baseUrl + `/api/get?theme=${query.theme}&dateStart=${dateStart}&dateEnd=`)
//     return { props: { theme: query.theme, fallbackData: data } }
// }