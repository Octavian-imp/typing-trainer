import { useEffect, useRef } from "react";

export function usePrev<T>(value: T) {
    const prevRef = useRef<T>(value);
    useEffect(() => {
        prevRef.current = value;
    }, [value]);

    return prevRef.current;
}
