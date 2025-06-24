import NewsList from '../../components/NewsList'

export default async function Page({ params }) {
    return (
        <NewsList theme={(await params).theme} />
    )
}