import styles from '@/assets/styles/headings.module.scss'

interface HeadingProps {
    children: React.ReactNode
    type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
    className?: string
    id?: string
    props?: any
}

const Heading = ({
    children,
    className = '',
    type,
    tag,
    id,
    ...props
}: HeadingProps) => {
    const HeagingLevel = tag || type

    return (
        <HeagingLevel
            className={`${styles[type]} ${className}`}
            id={id}
            {...props}
        >
            {children}
        </HeagingLevel>
    )
}

export default Heading
