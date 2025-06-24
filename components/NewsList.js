'use client'

import { useState, useEffect } from 'react'
//import useSWRInfinite from 'swr/infinite'
//import InfiniteScroll from 'react-infinite-scroll-component'

import SearchInput from './SearchInput'
import Item from './Item'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

import styles from '../styles/Home.module.css'

const fetcher = url => fetch(url).then(res => res.json())

export default function NewsList({ theme, fallbackData }) {
    const [dateStart, setDateStart] = useState(dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss'))
    const [dateEnd, setDateEnd] = useState(dayjs().endOf('month').format('YYYY-MM-DD HH:mm:ss'))
    const [news, setNews] = useState([])

    const setDates = (month, year) => {
        let date = dayjs().set('month', month)
        date = date.set('year', year)
        setDateStart(date.startOf('month').format('YYYY-MM-DD HH:mm:ss'))
        setDateEnd(date.endOf('month').format('YYYY-MM-DD HH:mm:ss'))
    }

	// const { data, error, size, setSize } = useSWRInfinite((pageIndex, previousPageData) => {
    //         const prevOrInitialData = previousPageData || fallbackData
	// 		if (prevOrInitialData && !prevOrInitialData.after.length) return null
	// 		if (pageIndex === 0) return `/api/get?theme=${theme}&dateStart=${dateStart}&dateEnd=${dateEnd}`
	// 		return `/api/get?theme=${theme}&dateStart=${dateStart}&dateEnd=${dateEnd}&cursor=${prevOrInitialData.after}`
	// 	},
	// 	fetcher,
    //     { revalidateOnFocus: false, fallbackData: fallbackData && [fallbackData] }
	// )
	
    // const news = data ? data.reduce((all, d) => all.concat(d.news), []) : []
	
	// const isEmpty = data?.[0]?.length === 0
	// const isReachingEnd = isEmpty || (data && data[data.length - 1]?.news?.length < 8)
    
    useEffect(() => {
        async function getData(dateStart, dateEnd) {
            const res = await fetch(`api/get?theme=${theme}&dateStart=${dateStart}&dateEnd=${dateEnd}`)
            let data = await res.json()
            data = data.map(n => {
                n.date = dayjs(n.date).format('DD MMM YYYY HH:mm')
                return n
            })
            setNews(data)
        }
        setNews([])
        getData(dateStart, dateEnd)
    }, [dateStart])


	return (      
        <main className={styles.main}>
            <div className={styles.theme}>{theme}</div>
            <SearchInput today={dayjs()} setDates={setDates} />
            
            {/* <InfiniteScroll 
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
            </InfiniteScroll> */}

            <div className={styles.news}>
                {news.map((item, i) => <Item item={item} key={i} />)}
            </div>
        </main>
    )
}