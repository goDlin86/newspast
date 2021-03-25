import { useSWRInfinite } from 'swr'
import InfiniteScroll from 'react-infinite-scroll-component'

import Item from './Item'

import styles from '../styles/Home.module.css'

const fetcher = url => fetch(url).then(res => res.json())

export default function SearchList({ theme, dateStart, dateEnd }) {
	const { data, error, size, setSize } = useSWRInfinite((pageIndex, previousPageData) => {
			if (previousPageData && !previousPageData.after.length) return null
			if (pageIndex === 0) return `/api/search?theme=${theme}&dateStart=${dateStart}&dateEnd=${dateEnd}`
			return `/api/search?theme=${theme}&dateStart=${dateStart}&dateEnd=${dateEnd}&cursor=${previousPageData.after}`
		},
		fetcher
	)
	
    const news = data ? data.reduce((all, d) => all.concat(d.news), []) : []
	
	const isEmpty = data?.[0]?.length === 0
	const isReachingEnd =
		isEmpty || (data && data[data.length - 1]?.news?.length < 8)

	return (      
        <>
            <InfiniteScroll 
                dataLength={news.length}
                next={() => setSize(size + 1)}
                hasMore={!isReachingEnd}
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
                        <b>Больше нет</b>
                    </p>
                }>
                {news.map((item, i) => <Item item={item} key={i} />)}
            </InfiniteScroll>
        </>
    )
}