import { useEffect, useRef } from 'react'

const useAnimationFrame = (callback: (arg0: number) => void) => {
    const requestRef = useRef<number>()
    const previousTimeRef = useRef<number>()

    const animate = (time: number) => {
        if (previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current
            callback(deltaTime)
        }
        previousTimeRef.current = time
        requestRef.current = requestAnimationFrame(animate)
    }

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(requestRef.current!)
    }, []) // Make sure the effect runs only once
}

export default useAnimationFrame
