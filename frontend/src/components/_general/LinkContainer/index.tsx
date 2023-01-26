import { ComponentPropsWithoutRef } from 'react'
import styles from './styles.module.scss'

const LinkContainer = ({ children }: ComponentPropsWithoutRef<'div'>) => {
    return <div className={styles.links}>{children}</div>
}

export default LinkContainer
