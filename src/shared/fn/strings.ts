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
 * @param text текст
 * @param indentWords количество слова для отступа
 * @returns вырезает переданное количество слов и возвращает остаток
 */
export function getIndentText(text: string, indentWords: number) {
    return text.split(" ").splice(indentWords).join(" ");
}
