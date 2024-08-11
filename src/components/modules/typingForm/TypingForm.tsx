import {
    ChangeEvent,
    KeyboardEvent,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react"
import { useDispatch } from "react-redux"
import { controlText, controlWordsForText } from "../../../constant/controlText"
import { TIMER_VALUE } from "../../../constant/timerValue"
import getIndexFirstDiffLetter, {
    getIndentText,
} from "../../../shared/fn/strings"
import { usePrev } from "../../../shared/hooks/usePrev"
import useTimeout from "../../../shared/hooks/useTimeout"
import { addResults } from "../../../store/reducers/wordsStat"
import UiInput from "../../ui/input/UiInput"
import TypingControlText from "./controlText/TypingControlText"
import FinishScreen from "./screens/finish/FinishScreen"
import StartScreen from "./screens/start/StartScreen"
import styles from "./TypingForm.module.scss"

const TypingForm = () => {
    const dispatch = useDispatch()

    // - поля для работы с таймером
    const [timerEnabled, setTimerEnabled] = useState<boolean>(false)
    const timeValue = useRef<number>(TIMER_VALUE)

    // - поля для работы с текстом и полем ввода
    const inputRef = useRef<HTMLInputElement>(null)
    const [input, setInput] = useState<string>("")
    const prevInput = usePrev(input)
    const indxActiveWord = useRef<number>(0)
    const [indxErrLetter, setIndxErrLetter] = useState<number>()
    const [indxErrWord, setIndxErrWord] = useState<number>()
    const [countErrWords, setCountErrWords] = useState<number>(0)
    const [controlWordsForTextState, setControlWordsForTextState] =
        useState(controlWordsForText)

    useLayoutEffect(() => {
        // - уменьшаем индекс активного слова если длина слова уменьшается и индекс больше 0 а также в слове не допущена ошибка
        if (
            input.length < prevInput.length &&
            input.at(-1) !== " " &&
            indxActiveWord.current > 0 &&
            typeof indxErrWord === "undefined"
        ) {
            indxActiveWord.current--
            return
        }
        if (input.at(-1) === " " && input.length - 1 > 0) {
            // - предотвращаем ввод пробела если последний символ введенный ранее является пробелом
            if (prevInput?.at(-1) === " ") {
                setInput((prev) => prev.replace(/\s{1,}/g, " "))
                return
            }
            // - если индекс ошибочного слова и индекс ошибочного символа не определен, то увеличиваем индекс активного слова
            if (
                typeof indxErrLetter === "undefined" &&
                typeof indxErrWord === "undefined"
            ) {
                indxActiveWord.current++
                return
            }
        }
    }, [input])

    useEffect(() => {
        const lastControlLetter = controlText[input.length - 1]
        const lastControlWord = controlText.split(" ")[indxActiveWord.current]

        // - Проверяем не пустое ли состояние поля ввода
        if (typeof input.at(-1) === "string") {
            const lastInputWord = input.split(" ")[indxActiveWord.current]

            if (
                input.at(-1) !== lastControlLetter ||
                typeof indxErrWord !== undefined
            ) {
                const indexFirstDiffLetter = getIndexFirstDiffLetter(
                    controlText,
                    input,
                    indxActiveWord.current
                )

                if (indexFirstDiffLetter !== null) {
                    const incorrectWord = getIndentText(
                        input,
                        indxActiveWord.current
                    ).slice(indexFirstDiffLetter)

                    const firstPartControlWord = lastControlWord.slice(
                        0,
                        indexFirstDiffLetter
                    )
                    const lastPartControlWord =
                        lastControlWord.slice(indexFirstDiffLetter)

                    setControlWordsForTextState((prev) =>
                        prev.map((word, indx) =>
                            indxActiveWord.current === indx
                                ? {
                                      ...word,
                                      value:
                                          firstPartControlWord +
                                          incorrectWord +
                                          lastPartControlWord,
                                  }
                                : word
                        )
                    )

                    // - Проверяем не существует ли уже значение индекса ошибочного слова и его символа
                    if (
                        typeof indxErrLetter === "undefined" &&
                        typeof indxErrWord === "undefined"
                    ) {
                        setIndxErrLetter(indexFirstDiffLetter)
                        setIndxErrWord(indxActiveWord.current)
                        setCountErrWords((prev) => prev + 1)
                    }
                    return
                }
            }

            // - Проверяем совпадает ли последняя введенная буква с последней буквой в контрольном тексте и что последнее слово равно контрольному
            if (
                input.at(-1) === lastControlLetter &&
                lastInputWord === lastControlWord.slice(0, lastInputWord.length)
            ) {
                setIndxErrLetter(undefined)
                setIndxErrWord(undefined)
                setControlWordsForTextState((prev) =>
                    prev.map((word, indx) =>
                        indx === indxActiveWord.current
                            ? { ...word, value: lastControlWord }
                            : word
                    )
                )
            }
        }

        // - Обнуляем индекс ошибки если поле ввода пустое
        if (input.length === 0) {
            setControlWordsForTextState((prev) =>
                prev.map((word, indx) =>
                    indx === indxActiveWord.current
                        ? { ...word, value: lastControlWord }
                        : word
                )
            )
            setIndxErrLetter(undefined)
            setIndxErrWord(undefined)
        }
    }, [input])

    useEffect(() => {
        function startTrainingOnSpaceBar(ev: KeyboardEventInit) {
            if (ev.key === "Enter") {
                handleStartTimer()
            }
        }
        document.addEventListener("keydown", startTrainingOnSpaceBar)
        return () => {
            document.removeEventListener("keydown", startTrainingOnSpaceBar)
        }
    }, [])

    // - Запускаем таймер и после добавляем результаты в redux
    useTimeout(
        () => {
            dispatch(
                addResults({
                    errors: countErrWords,
                    wordsPerMin: indxActiveWord.current,
                })
            )

            setTimerEnabled(false)
            setCountErrWords(0)
            setControlWordsForTextState(controlWordsForText)
            indxActiveWord.current = 0
            setInput("")
        },
        timeValue.current,
        timerEnabled
    )

    const handleStartTimer = useCallback(() => {
        if (timerEnabled) return
        setTimerEnabled(true)
        inputRef.current?.removeAttribute("disabled")
        inputRef.current?.focus()
    }, [])

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value)
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        // - отменяем действия по умолчанию если нажаты стрелки смещения курсора
        if (
            e.key === "ArrowDown" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowUp"
        ) {
            e.preventDefault()
            e.stopPropagation()
            return
        }
    }

    return (
        <div className={styles.body}>
            <div className={styles.header}>
                <UiInput
                    ref={inputRef}
                    disable={timerEnabled}
                    value={input}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div className={styles.control_text_body}>
                {/* проверяем если индекс активного слова равен длине массива контрольных слов, то выводим сообщение */}
                {indxActiveWord.current === controlWordsForTextState.length && (
                    <FinishScreen />
                )}
                <StartScreen
                    handleStartTimer={handleStartTimer}
                    timerEnabled={timerEnabled}
                />
                <TypingControlText
                    controlWordsForText={controlWordsForTextState}
                    indxActiveWord={indxActiveWord}
                    indxErrLetter={indxErrLetter}
                />
            </div>
        </div>
    )
}

export default TypingForm
