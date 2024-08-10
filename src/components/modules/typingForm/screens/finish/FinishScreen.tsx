import { memo } from "react"
import styles from "./FinishScreen.module.scss"

const FinishScreen = memo(() => {
    return (
        <div className={styles.finish_text}>
            Тренировка завершена, спасибо! Дальше нет смысла проверять и так
            видно что вы мастер :)
        </div>
    )
})

export default FinishScreen
