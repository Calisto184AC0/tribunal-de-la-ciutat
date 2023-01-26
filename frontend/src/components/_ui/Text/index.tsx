import styles from '@/assets/styles/texts.module.scss'

interface TextProps {
    children: React.ReactNode
    type: 'normal' | 'sangria' | 'pequeno' | 'extracto' | 'etiqueta'
    tag?: 'p' | 'span' | 'div'
    className?: string
    props?: any
}

const Text = ({ children, className, type, tag, ...props }: TextProps) => {
    const TextTag = tag || 'p'

    return (
        <TextTag className={`${styles[type]} ${className}`} {...props}>
            {children}
        </TextTag>
    )
}

export default Text
