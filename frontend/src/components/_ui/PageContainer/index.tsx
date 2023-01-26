import { ComponentPropsWithoutRef } from 'react'
import styles from './styles.module.scss'

const PageContainer = ({
    children,
    className = '',
}: ComponentPropsWithoutRef<'div'>) => (
    <div className={`${styles.container} ${className}`}>{children}</div>
)

export default PageContainer
