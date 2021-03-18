import Head from 'next/head'
import Nav from '../pages_lib/Nav'

import styles from '../styles/Home.module.css'

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>NEWS from the PAST</title>
                <link rel='icon' href='/favicon.ico' />
                <link href='https://fonts.googleapis.com/css?family=Lato:100,400,700,900' rel='stylesheet' type='text/css' />
            </Head>

            <div className={styles.container}>
                <Nav />
                {children}
            </div>
        </>
    )
}