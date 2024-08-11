import cn from "clsx"
import { forwardRef, HTMLAttributes, LegacyRef } from "react"
import styles from "./UiInput.module.scss"

type Props = {
    disable: boolean
    value: string
} & Pick<HTMLAttributes<HTMLInputElement>, "onChange" | "onKeyDown">

const UiInput = forwardRef(
    (
        { disable, onChange, onKeyDown, value }: Props,
        ref: LegacyRef<HTMLInputElement> | undefined
    ) => {
        return (
            <div
                className={cn(styles.input_body, {
                    [styles.active]: disable,
                })}
            >
                <input
                    type="text"
                    autoComplete={"off"}
                    autoCorrect="off"
                    ref={ref}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    disabled={!disable}
                    className={styles.input_text}
                />
            </div>
        )
    }
)

export default UiInput
