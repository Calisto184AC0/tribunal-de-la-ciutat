import { RefObject, useRef } from 'react'
import useAnimationFrame from './useAnimationFrame'

const usePermaScrolling = (): RefObject<HTMLDivElement> => {
    const containerRef = useRef<HTMLDivElement>(null)

    const pageScroll = () => {
        if (!containerRef.current) return
        if (!containerRef.current.children.length) return

        const container = containerRef.current

        const {
            // scrollTop: positionScroll,
            children: carruselImgs,
            //clientHeight: windowHeight,
        } = container

        const first = carruselImgs[0] as HTMLDivElement

        if (
            container.scrollTop >= first.clientHeight &&
            first.clientHeight > 0
        ) {
            container.append(first)
            container.scrollTo(0, 0)
        }

        container.scrollBy(0, 1)
    }

    useAnimationFrame(pageScroll)

    return containerRef
}

export default usePermaScrolling
