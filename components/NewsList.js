'use client'

import { useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import InfiniteScroll from 'react-infinite-scroll-component'

import SearchInput from './SearchInput'
import Item from './Item'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

import styles from '../styles/Home.module.css'

const fetcher = url => fetch(url).then(res => res.json()).then(data => data.map(n => {
   n.date = dayjs(n.date).format('DD MMM YYYY HH:mm')
   return n
}))

export default function NewsList({ theme }) {
    const [dateStart, setDateStart] = useState(dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss'))
    const [dateEnd, setDateEnd] = useState(dayjs().endOf('month').format('YYYY-MM-DD HH:mm:ss'))

    const setDates = (month, year) => {
        let date = dayjs().set('month', month)
        date = date.set('year', year)
        setDateStart(date.startOf('month').format('YYYY-MM-DD HH:mm:ss'))
        setDateEnd(date.endOf('month').format('YYYY-MM-DD HH:mm:ss'))
    }

	const { data, error, size, setSize } = useSWRInfinite((pageIndex, previousPageData) => {
			if (previousPageData && !previousPageData.length) return null
			return `/api/get?theme=${theme}&dateStart=${dateStart}&dateEnd=${dateEnd}&offset=${pageIndex*8}`
		},
		fetcher,
        { revalidateOnFocus: false }
	)
	
    const news = data ? data.reduce((all, d) => all.concat(d), []) : []
	
	const isEmpty = data?.[0]?.length === 0
	const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 8)

	return (      
        <main className={styles.main}>
            <div className={styles.theme}>{theme}</div>
            <SearchInput today={dayjs()} setDates={setDates} />
            
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
        </main>
    )
}