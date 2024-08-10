import { useEffect, useRef, useState } from "react"

/**
 *
 * @param callback
 * @param delay задержка в секундах
 * @param enabled
 */
export default function useTimeout(
    callback: () => void,
    delay: number,
    enabled: boolean
) {
    const cbRef = useRef(callback)
    const [timer, setTimer] = useState(0)
    const [counter, setCounter] = useState(delay)

    useEffect(() => {
        cbRef.current = callback
    }, [callback])

    useEffect(() => {
        if (!enabled) return
        const intervalId = setInterval(() => {
            setTimer(timer + 1)
            setCounter((prev) => Math.max(0, prev - 1))
        }, 1000)

        return () => clearInterval(intervalId)
    }, [enabled])

    useEffect(() => {
        if (counter === 0) {
            setTimer(0)
            setCounter(delay)
            cbRef.current()
        }
    }, [counter])
}
