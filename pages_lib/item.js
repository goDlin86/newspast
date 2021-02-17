import styles from '../styles/Home.module.css'

const Item = ({ item }) => {
    return (
        <a className={styles.article} href={item.link} target="_blank">
            <div className={styles.date}>{item.date}</div>
            <div class={styles.title}>{item.title}</div>
            <div class={styles.publisher}>{item.publisher}</div>
        </a>
    )
}

export default Item