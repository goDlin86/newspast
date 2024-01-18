import NewsList from '../../components/NewsList'

export default function Page({ params }) {
    return (
        <NewsList theme={params.theme} />
    )
}