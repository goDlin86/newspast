'use client'

import { useState } from 'react'

import stylesSearch from '../styles/SearchInput.module.css'

const monthes = 'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'
const years = '2025'

export default function SearchInput({ today, setDates }) {
    const [month, setMonth] = useState(today.month())
    const [year, setYear] = useState(today.year())

    return (
        <div className={stylesSearch.inputForm}>
            <select className={stylesSearch.select} defaultValue={month} onChange={e => setMonth(e.target.value)}>
                {monthes.split('_').map((month, i) => <option value={i} key={i}>{month}</option>)}
            </select>
            <select className={stylesSearch.select} defaultValue={year} onChange={e => setYear(e.target.value)}>
                {years.split('_').map((year, i) => <option value={year} key={i}>{year}</option>)}
            </select>

            <button className={stylesSearch.select} onClick={() => setDates(month, year)}>Поиск</button>
        </div>
    )
}