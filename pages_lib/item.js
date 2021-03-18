import styles from '../styles/Home.module.css'

const Item = ({ item }) => {
    return (
        <a className={styles.article} href={item.link} target="_blank">
            <div className={styles.date}>{item.date}</div>
            <div className={styles.title}>{item.title}</div>
            <div className={styles.publisher}>{item.publisher}</div>
        </a>
    )
}

export default Item