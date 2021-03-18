import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from '../styles/Nav.module.css'

export default function Nav() {
    const { asPath } = useRouter()

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <div className={styles.logonews}>NEWS</div>
                <div className={styles.logofrom}>from</div>
                <div className={styles.logothe}>THE</div>
                <div className={styles.logopast}>PAST</div>
            </div>
            <div></div>
            <Link href="/[theme]" as='/world'>
                <a className={asPath === '/world'? styles.menu + ' ' + styles.current : styles.menu}>World</a>
            </Link>
            <Link href="/[theme]" as='/nation'>
                <a className={asPath === '/nation'? styles.menu + ' ' + styles.current : styles.menu}>Россия</a>
            </Link>
            <Link href="/[theme]" as='/scitech'>
                <a className={asPath === '/scitech'? styles.menu + ' ' + styles.current : styles.menu}>Наука</a>
            </Link>
        </header>
    )
}