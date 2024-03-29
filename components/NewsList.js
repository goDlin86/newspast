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

const fetcher = url => fetch(url).then(res => res.json())

export default function NewsList({ theme, fallbackData }) {
    const [dateStart, setDateStart] = useState(dayjs().endOf('month').toISOString().slice(0, -5))
    const [dateEnd, setDateEnd] = useState('')

    const setDates = (month, year) => {
        let date = dayjs().set('month', month)
        date = date.set('year', year)
        setDateStart(date.endOf('month').toISOString().slice(0, -5))
        setDateEnd(date.startOf('month').toISOString().slice(0, -5))
    }

	const { data, error, size, setSize } = useSWRInfinite((pageIndex, previousPageData) => {
            const prevOrInitialData = previousPageData || fallbackData
			if (prevOrInitialData && !prevOrInitialData.after.length) return null
			if (pageIndex === 0) return `/api/get?theme=${theme}&dateStart=${dateStart}&dateEnd=${dateEnd}`
			return `/api/get?theme=${theme}&dateStart=${dateStart}&dateEnd=${dateEnd}&cursor=${prevOrInitialData.after}`
		},
		fetcher,
        { revalidateOnFocus: false, fallbackData: fallbackData && [fallbackData] }
	)
	
    const news = data ? data.reduce((all, d) => all.concat(d.news), []) : []
	
	const isEmpty = data?.[0]?.length === 0
	const isReachingEnd = isEmpty || (data && data[data.length - 1]?.news?.length < 8)

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