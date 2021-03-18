import { useRouter } from 'next/router'
import { useSWRInfinite } from 'swr'
import InfiniteScroll from 'react-infinite-scroll-component'

import Item from './Item1'

import styles from '../styles/Home.module.css'

const fetcher = url => fetch(url).then(res => res.json())

export default function NewsList() {
	const router = useRouter()
	const { data, error, size, setSize } = useSWRInfinite((pageIndex, previousPageData) => {
			if (previousPageData && !previousPageData.after.length) return null
			if (pageIndex === 0) return `/api/get?theme=${router.query.theme}`
			return `/api/get?theme=${router.query.theme}&cursor=${previousPageData.after}`
		},
		fetcher
	)
	
    const news = data ? data.reduce((all, d) => all.concat(d.news), []) : []
	
	const isLoadingInitialData = !data && !error
	const isLoadingMore =
		isLoadingInitialData ||
		(size > 0 && data && typeof data[size - 1] === "undefined")
	const isEmpty = data?.[0]?.length === 0
	const isReachingEnd =
		isEmpty || (data && data[data.length - 1]?.length < 8)

	return (      
        <main className={styles.main}>
            <div className={styles.theme}>{router.query.theme}</div>
            {news.length === 0 ? 
            (<p style={{textAlign: 'center'}}><b>Загрузка...</b></p>) : 
            (<InfiniteScroll 
                dataLength={news.length}
                next={() => setSize(size + 1)}
                hasMore={!isLoadingMore || !isReachingEnd}
                style={{'overflow': 'unset'}}
                className={styles.news}
                scrollThreshold={0.95}
                loader={
                    <p style={{textAlign: 'center'}}>
                        <b>Загрузка...</b>
                    </p>
                }
                endMessage={
                    <p style={{textAlign: 'center'}}>
                        <b>Ѕольше нет</b>
                    </p>
                }>
                {news.map((item, i) => <Item item={item} key={i} />)}
            </InfiniteScroll>)}
        </main>
    )
}