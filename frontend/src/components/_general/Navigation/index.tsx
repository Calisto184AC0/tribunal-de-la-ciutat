import styles from './styles.module.scss'

interface NavigationProps {
    children?: React.ReactNode
    color: 'salmon' | 'orange'
}

const Navigation = ({ children, color }: NavigationProps) => {
    return (
        <div
            className={styles.container}
            style={{
                backgroundColor: `var(--${color})`,
            }}
        >
            {children}
        </div>
    )
}

export default Navigation
