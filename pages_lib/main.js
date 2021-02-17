import styles from '../styles/Home.module.css'

import { useParams } from 'react-router-dom'

const Main = () => {
    const { theme } = useParams()

    return (
        <main className={styles.main}>
          <div className={styles.theme}>{theme}</div>
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
    )
}

export default Main