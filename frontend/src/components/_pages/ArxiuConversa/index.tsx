import { TransitionContainer } from '@/components/_general'
import useContentReducer from '@/hooks/useContentReducer'
import { PageId } from '@/hooks/useContentReducer/types'
import { LateralDirection } from '@/types'
import { useState } from 'react'
import Arxiu from '../Arxiu'
import Conversa from '../Conversa'

const ArxiuConversa = () => {
    const [direction, setDirection] = useState<LateralDirection>('left')
    const { content, newContent, transition, saveState, reset } =
        useContentReducer({
            pageId: PageId.Conversa,
            content: <Conversa />,
            newContent: null,
        })

    return (
        <>
            <Arxiu
                transition={transition}
                returnHandler={() => {
                    setDirection('right')
                    transition(PageId.Conversa, <Conversa />)
                }}
            />
            <TransitionContainer
                content={content}
                newContent={newContent}
                direction={direction}
                numColumns={1}
                transitionEndHandler={() => {
                    setDirection('left')
                    saveState()
                }}
            />
        </>
    )
}

export default ArxiuConversa
