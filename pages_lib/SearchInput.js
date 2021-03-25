import React, { useState, useEffect } from "react"

import SearchList from '../pages_lib/SearchList'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

import styles from '../styles/Home.module.css'
import stylesSearch from '../styles/SearchInput.module.css'

const monthes = 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'
const years = '2019_2020_2021'

export default function SearchInput() {
    const today = dayjs()

    const [month, setMonth] = useState(today.month())
    const [year, setYear] = useState(today.year())

    const [dateStart, setDateStart] = useState(null)
    const [dateEnd, setDateEnd] = useState(null)

    const click = () => {
        let date = today.set('month', month)
        date = date.set('year', year)
        setDateStart(date.endOf('month').toISOString().slice(0, -5))
        setDateEnd(date.startOf('month').toISOString().slice(0, -5))
    }

    return (
        <main className={styles.main}>
            <div className={styles.theme}>Search</div>
            <div>
                <select defaultValue={month} onChange={e => setMonth(e.target.value)}>
                    {monthes.split('_').map((month, i) => <option value={i}>{month}</option>)}
                </select>
                <select defaultValue={year} onChange={e => setYear(e.target.value)}>
                    {years.split('_').map(year => <option value={year}>{year}</option>)}
                </select>

                <button onClick={click}>Поиск</button>
            </div>

            {dateStart && <SearchList theme='world' dateStart={dateStart} dateEnd={dateEnd} />}
        </main>
    )
}