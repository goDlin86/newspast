import styles from '../styles/Home.module.css'

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

import Item from './item'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

const Main = () => {
    const [data, setData] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const { theme } = useParams()

    let after = ''
    let afterDate = ''

    useEffect(() => {
        setData([])
        setHasMore(true)
        after = ''
        afterDate = ''
        fetchData()
    }, [theme])

    const fetchData = async () => {
        try {
            const res = await fetch('/api/getNews', { 
                method: 'POST', 
                body: JSON.stringify({ theme, after: after, afterDate: afterDate }) 
            })
            const json = await res.json()
            const results = json || []

            if (results.news.length < 8) {
                setHasMore(false)
            }

            if (results.news.length === 0) {
                return
            }

            const news = results.news.map(n => {
                n.date = dayjs(n.date).format('DD MMM YYYY HH:MM')
                return n
            })

            after = results.after
            afterDate = results.afterDate

            setData(prevState => (prevState.news.concat(news)))

        } catch(err) {
            console.error(err)
            setHasMore(false)
        }
    }

    return (
        <main className={styles.main}>
            <div className={styles.theme}>{theme}</div>
            <InfiniteScroll 
                dataLength={data.length}
                next={fetchData}
                hasMore={hasMore}
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
                {data.map((item, i) => <Item item={item} key={i} />)}
            </InfiniteScroll>
        </main>
    )
}

export default Main