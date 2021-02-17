import styles from '../styles/Home.module.css'

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Item from './item'

import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

const Main = () => {
    const [data, setData] = useState([])
    const { theme } = useParams()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        //setData([])

        try {
            const data = JSON.stringify({ theme: theme, after: data ? data.after : '', afterDate: data ? data.afterDate : '' })

            const res = await fetch('/api/getNews', { method: 'POST', body: data })
            const json = await res.json()
            const results = json || []

            const news = results.news.map(n => {
                n.date = dayjs(n.date).format('DD MMM YYYY HH:MM')
                return n
            })
            
            const d = { 'afterDate': results.afterDate, 'after': results.after, news }

            setData(d)

        } catch(err) {
            console.error(err)
        }
    }

    return (
        <main className={styles.main}>
          <div className={styles.theme}>{theme}</div>
          <div className={styles.news}>
            {data.length === 0 && <div>Загрузка...</div>}
            {data.news && data.news.map((item, i) => <Item item={item} key={i} />)}
          </div>
        </main>
    )
}

export default Main