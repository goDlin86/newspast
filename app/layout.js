import Nav from '../components/Nav'
import { Analytics } from '@vercel/analytics/react'

import '../styles/globals.css'
import styles from '../styles/Home.module.css'

export default function Layout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>NEWS from the PAST</title>
                <link rel='icon' href='/favicon.ico' />
                <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
                <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon-180.png' />
                <link href='https://fonts.googleapis.com/css?family=Lato:100,400,700,900' rel='stylesheet' type='text/css' />
            </head>

            <body>
                <div className={styles.container}>
                    <Nav />
                    {children}
                    <Analytics />
                </div>
            </body>
        </html>
    )
}