'use client'

import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'

import styles from '../styles/Nav.module.css'

export default function Nav() {
    const [selectedLayoutSegment] = useSelectedLayoutSegments()

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <div className={styles.logonews}>NEWS</div>
                <div className={styles.logofrom}>from</div>
                <div className={styles.logothe}>THE</div>
                <div className={styles.logopast}>PAST</div>
            </div>
            <div></div>
            <Link href='/world' className={selectedLayoutSegment === 'world' ? styles.menu + ' ' + styles.current : styles.menu}>World</Link>
            <Link href='/nation' className={selectedLayoutSegment === 'nation' ? styles.menu + ' ' + styles.current : styles.menu}>Россия</Link>
            <Link href='/scitech' className={selectedLayoutSegment === 'scitech' ? styles.menu + ' ' + styles.current : styles.menu}>Наука</Link>
        </header>
    )
}