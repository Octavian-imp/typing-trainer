import cn from "clsx"
import styles from "./WordItem.module.scss"
import { memo } from "react"

type Props = {
    word: { key: string; value: string }
    activeWord: boolean
    indxErrLetter: number | null | undefined
    visited: boolean
}

const WordItem = memo(function ({
    indxErrLetter,
    activeWord,
    word,
    visited,
}: Props) {
    return (
        <div
            key={word.key}
            className={cn(styles.word, {
                [styles.activeWord]: activeWord,
                [styles.visited]: visited,
            })}
        >
            {word.value.split("").map((letter, indxLetter) => {
                return (
                    <span
                        key={word.key + indxLetter}
                        className={cn({
                            [styles.activeLetter]: activeWord,
                            [styles.error]: indxLetter === indxErrLetter,
                        })}
                    >
                        {letter}
                    </span>
                )
            })}
        </div>
    )
})

export default WordItem
