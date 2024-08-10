import { memo, useRef } from "react"
import { CSSTransition } from "react-transition-group"
import styles from "./StartScreen.module.scss"
import getDeviceType from "../../../../../shared/fn/deviceType"
type Props = {
    timerEnabled: boolean
    handleStartTimer: () => void
}

const StartScreen = memo(({ timerEnabled, handleStartTimer }: Props) => {
    const placeholderRef = useRef<HTMLDivElement>(null)
    const deviceType = getDeviceType()

    return (
        <CSSTransition
            nodeRef={placeholderRef}
            timeout={300}
            in={!timerEnabled}
            classNames={{
                enter: styles.clickToStart_enter,
                enterActive: styles.clickToStart_enterActive,
                enterDone: styles.clickToStart_enterDone,
                exit: styles.clickToStart_exit,
                exitActive: styles.clickToStart_exitActive,
                exitDone: styles.clickToStart_exitDone,
            }}
            mountOnEnter
            unmountOnExit
        >
            <div
                className={styles.clickToStart}
                ref={placeholderRef}
                onClick={handleStartTimer}
            >
                Нажмите {deviceType !== "mobile" && "Enter/"}на этот блок, чтобы
                начать тренировку
            </div>
        </CSSTransition>
    )
})

export default StartScreen
