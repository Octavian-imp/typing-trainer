import { useSelector } from "react-redux";
import { selectWordsStat } from "../../../store/reducers/wordsStat";
import styles from "./ResultTyping.module.scss";
import ResultItem from "./resultItem/ResultItem";

const ResultTyping = () => {
    const wordsStat = useSelector(selectWordsStat);

    return (
        <>
            {wordsStat.length > 0 && (
                <h1 className={styles.title}>Ваша статистика</h1>
            )}
            <ul className={styles.body}>
                {wordsStat.length === 0 && (
                    <li className={styles.emptyData}>
                        Здесь будет отображаться ваша статистика :)
                    </li>
                )}

                {wordsStat.map((wordStat, index) => (
                    <li key={index} className={styles.item}>
                        <ResultItem
                            attemptNumber={index + 1}
                            wordPerMinute={wordStat.wordsPerMin}
                            errors={wordStat.errors}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ResultTyping;
