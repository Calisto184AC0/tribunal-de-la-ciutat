import { useIsMobile } from '@/contexts/isMobileContext'
import { ComponentPropsWithoutRef, useEffect, useRef } from 'react'
import styles from './styles.module.scss'

const MobileNavigation = ({ children }: ComponentPropsWithoutRef<'nav'>) => {
    const navRef = useRef<HTMLDivElement>(null)
    const isMobile = useIsMobile()

    useEffect(() => {
        if (!isMobile) return

        const nav = navRef.current
        if (!nav) return

        document.body.style.setProperty(
            '--mobile-nav-height',
            `${nav.clientHeight}px`
        )
    }, [isMobile])

    return (
        <nav className={styles.nav} ref={navRef}>
            {children}
        </nav>
    )
}

export default MobileNavigation
