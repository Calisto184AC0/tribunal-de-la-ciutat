import { useIsMobile } from '@/contexts/isMobileContext'
import { LateralDirection } from '@/types'
import { ReactNode, useEffect, useState } from 'react'
import styles from './styles.module.scss'

interface TransitionContainerProps {
    content: ReactNode
    newContent: ReactNode
    direction: LateralDirection
    numColumns?: number
    transitionEndHandler: () => void
}

const TransitionContainer = ({
    content,
    newContent,
    direction,
    numColumns = 2,
    transitionEndHandler,
}: TransitionContainerProps) => {
    const [transitionClass, setTransitionClass] = useState('')
    const isMobile = useIsMobile()

    useEffect(() => {
        if (!isMobile) {
            const cssClassMap = {
                left: styles.slide_right_to_left,
                right: styles.slide_left_to_right,
            }

            if (newContent) setTransitionClass(cssClassMap[direction])
            else setTransitionClass('')
        } else {
            if (newContent) setTransitionClass(styles.fade_in)
            else setTransitionClass('')
        }

        return () => {
            setTransitionClass('')
        }
    }, [direction, newContent, isMobile])

    return (
        <div
            className={styles.main_content}
            style={{
                gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
            }}
        >
            {content}
            <div
                onTransitionEnd={transitionEndHandler}
                className={`${styles.new_content} ${styles[direction]} ${transitionClass}`}
                style={{
                    gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
                }}
            >
                {newContent}
            </div>
        </div>
    )
}

export default TransitionContainer
