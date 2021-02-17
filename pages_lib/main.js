import styles from '../styles/Home.module.css'

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

import Item from './item'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

const Main = () => {
    const [data, setData] = useState({ afterDate: '', after: '', news: [] })
    const { theme } = useParams()

    useEffect(() => {
        //setData([])
        fetchData()
    }, [theme])

    const fetchData = async () => {
        try {
            const data = JSON.stringify({ theme: theme, after: data ? data.after : '', afterDate: data ? data.afterDate : '' })

            const res = await fetch('/api/getNews', { method: 'POST', body: data })
            const json = await res.json()
            const results = json || []

            const news = results.news.map(n => {
                n.date = dayjs(n.date).format('DD MMM YYYY HH:MM')
                return n
            })

            setData({ afterDate: results.afterDate, after: results.after, news: data.news.concat(news) })

        } catch(err) {
            console.error(err)
        }
    }

    return (
        <main className={styles.main}>
          <div className={styles.theme}>{theme}</div>
          <div className={styles.news}>
            {data.length === 0 && <p>Загрузка...</p>}
            {data.news && 
                <InfiniteScroll 
                    dataLength={data.news.length}
                    next={fetchData}
                    hasMore={true}
                    style={{'overflow': 'unset'}}
                    scrollThreshold={0.95}
                    loader={<p>Загрузка...</p>}
                    endMessage={
                        <p style={{textAlign: 'center'}}>
                        <b>Больше нет</b>
                        </p>
                    }>
                    {data.news.map((item, i) => <Item item={item} key={i} />)}
                </InfiniteScroll>
            }
          </div>
        </main>
    )
}

export default Main