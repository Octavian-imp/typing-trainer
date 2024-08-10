import styles from "./ResultItem.module.scss"

type Props = { attemptNumber: number; wordPerMinute: number; errors: number }

const ResultItem = ({ attemptNumber, wordPerMinute, errors }: Props) => {
    return (
        <article className={styles.body}>
            <h1>Попытка №{attemptNumber}</h1>
            <span>
                <strong>Слов в минуту:</strong> {wordPerMinute}{" "}
            </span>
            <span>
                <strong>Кол-во ошибочных слов:</strong> {errors} ошибка(-ок)
            </span>
        </article>
    )
}

export default ResultItem
