import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { BrowserRouter as Router, Redirect, Switch, Route, NavLink } from 'react-router-dom'

import Main from '../pages_lib/main'

export default function Home() {
  return (
    <Router>
      <div className={styles.container}>
        <Head>
          <title>NEWS from the PAST</title>
          <link rel="icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/css?family=Lato:100,400,700,900" rel="stylesheet" type="text/css" />
        </Head>

        <header className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logonews}>NEWS</div>
            <div className={styles.logofrom}>from</div>
            <div className={styles.logothe}>THE</div>
            <div className={styles.logopast}>PAST</div>
          </div>
          <div></div>
          <NavLink to='world' className={styles.menu} activeClassName={styles.current}>World</NavLink>
          <NavLink to='russia' className={styles.menu} activeClassName={styles.current}>Россия</NavLink>
          <NavLink to='science' className={styles.menu} activeClassName={styles.current}>Наука</NavLink>
        </header>

        <Switch>
          <Redirect exact from="/" to="/world" />
          <Route path='/:theme' children={<Main />} />
        </Switch>
      </div>
    </Router>
  )
}
