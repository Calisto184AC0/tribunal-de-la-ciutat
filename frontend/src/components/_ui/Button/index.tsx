import textStyles from '@/assets/styles/texts.module.scss'
import useToggleState from '@/hooks/useToggleState'
import { ComponentPropsWithoutRef } from 'react'
import styles from './styles.module.scss'

type ButtonProps = ComponentPropsWithoutRef<'button'>

const Button = ({ children, className, onClick, ...props }: ButtonProps) => {
    const [isActivado, toggleIsActivado] = useToggleState(false)

    return (
        <button
            className={`${textStyles.etiqueta} ${
                isActivado ? styles.activado : styles.boton
            }`}
            onClick={e => {
                toggleIsActivado()
                onClick && onClick(e)
            }}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
