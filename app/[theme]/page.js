import NewsList from '../../pages_lib/NewsList'

export default function Page({ params }) {
    return (
        <NewsList theme={params.theme} />
    )
}