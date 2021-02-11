import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
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
        <div className={styles.menu + " " + styles.current}>World</div>
        <div className={styles.menu}>Россия</div>
        <div className={styles.menu}>Наука</div>
      </header>

      <main className={styles.main}>
        <div className={styles.theme}>world</div>
        <div className={styles.news}>
          <a className={styles.article} href="/" target="_blank">
            <div className={styles.date}>10 февр. 2021 18:02</div>
            <div class={styles.title}>США введут санкции из-за военного переворота в Мьянме</div>
            <div class={styles.publisher}>RT на русском</div>
          </a>
          <a className={styles.article} href="/" target="_blank">
            <div className={styles.date}>10 февр. 2021 18:02</div>
            <div class={styles.title}>США введут санкции из-за военного переворота в Мьянме</div>
            <div class={styles.publisher}>RT на русском</div>
          </a>
          <a className={styles.article} href="/" target="_blank">
            <div className={styles.date}>10 февр. 2021 18:02</div>
            <div class={styles.title}>США введут санкции из-за военного переворота в Мьянме</div>
            <div class={styles.publisher}>RT на русском</div>
          </a>
        </div>
      </main>
    </div>
  )
}
