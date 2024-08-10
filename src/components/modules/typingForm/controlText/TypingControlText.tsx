import { MutableRefObject } from "react"
import WordItem from "./wordItem/WordItem"

type Props = {
    controlWordsForText: { key: string; value: string }[]
    indxActiveWord: MutableRefObject<number>
    indxErrLetter: number | null | undefined
}

const TypingControlText = function ({
    controlWordsForText,
    indxActiveWord,
    indxErrLetter,
}: Props) {
    return (
        <>
            {controlWordsForText.map((word, indxWord) => (
                <WordItem
                    key={word.key + word.value}
                    word={word}
                    activeWord={indxWord === indxActiveWord.current}
                    indxErrLetter={indxErrLetter}
                    visited={indxWord < indxActiveWord.current}
                />
            ))}
        </>
    )
}

export default TypingControlText
