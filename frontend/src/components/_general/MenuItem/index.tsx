import headingStyles from '@/assets/styles/headings.module.scss'
import { ComponentPropsWithoutRef } from 'react'
import styles from './styles.module.scss'

interface MenuItemProps extends ComponentPropsWithoutRef<'div'> {
    label: string
}

const MenuItem = ({ label, onClick }: MenuItemProps) => {
    return (
        <div className={`${headingStyles.h3} ${styles.item}`} onClick={onClick}>
            {label}
        </div>
    )
}

export default MenuItem
