/**
 * @param {string} controlText
 * @param {string} compareStr
 * @returns Возвращает индекс первой различающейся буквы если строки не совпадают, иначе null
 */
export default function getIndexFirstDiffLetter(
    controlText: string,
    compareStr: string,
    startWordAt?: number
): number | null {
    let startWordIndex = 0;
    if (startWordAt !== 0 && typeof startWordAt === "number") {
        controlText = getIndentText(controlText, startWordAt);
        compareStr = getIndentText(compareStr, startWordAt);
    }
    // - проверяем символы до первого различия
    for (let i = startWordIndex; i < compareStr.length; i++) {
        if (controlText[i] !== compareStr[i]) {
            
            return i;
        }
    }
    return null;
}

/**
 *
 * @param controlText контрольная строка
 * @param wordIndex индекс слова
 * @returns индекс первого символа слова в контрольной строке иначе -1
 */
export function getStartIndexWordIntoString(
    controlText: string,
    wordIndex: number
): number {
    let resultStartIndex = 0;

    let startWordIndex = controlText.split(" ").findIndex((word, index) => {
        if (index === wordIndex) {
            resultStartIndex += index;
            return true;
        }
        resultStartIndex += word.length + 1;
        return false;
    });

    return startWordIndex === -1 ? -1 : resultStartIndex;
}

/**
 *
 * @param text текст
 * @param indentWords количество слова для отступа
 * @returns вырезает переданное количество слов и возвращает остаток
 */
export function getIndentText(text: string, indentWords: number) {
    return text.split(" ").splice(indentWords).join(" ");
}
