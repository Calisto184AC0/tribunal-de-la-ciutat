import textsStyles from '@/assets/styles/texts.module.scss'
import { Carrusel } from '@/components/_pages'
import { PageId } from '@/hooks/useContentReducer/types'
import useToggleState from '@/hooks/useToggleState'
import { ComponentPropsWithoutRef, ReactNode, useEffect } from 'react'
import styles from './styles.module.scss'

interface MobileMenuItemProps extends ComponentPropsWithoutRef<'div'> {
    color: 'purple' | 'salmon' | 'gray' | 'orange'
    label: string
    currentPageId: PageId
    pageId: PageId
    transition: (pageId: PageId, newContent: ReactNode) => void
}

const MobileMenuItem = ({
    onClick,
    transition,
    color,
    label,
    currentPageId,
    pageId,
}: MobileMenuItemProps) => {
    const [isActivado, toggleIsActivado, setIsActivado] = useToggleState(false)

    useEffect(() => {
        if (isActivado && currentPageId !== pageId) toggleIsActivado()
        if (currentPageId === pageId) setIsActivado(true)
    }, [currentPageId])

    return (
        <div
            className={`${isActivado && styles.activado} ${styles.nav_item} ${
                textsStyles.nav_item
            }`}
            style={{ backgroundColor: `var(--${color})` }}
            onClick={e => {
                if (!isActivado) {
                    toggleIsActivado()
                    onClick && onClick(e)
                } else {
                    transition(PageId.Carrusel, <Carrusel />)
                }
            }}
        >
            {label}
            <span>○</span>
        </div>
    )
}

export default MobileMenuItem
