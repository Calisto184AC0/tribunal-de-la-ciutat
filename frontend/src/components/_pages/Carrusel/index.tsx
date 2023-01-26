import useCarrusel from './hooks/useCarrusel'
import usePermaScrolling from './hooks/usePermaScrolling'
import styles from './styles.module.scss'

const Carrusel = () => {
    const contianerRef = usePermaScrolling()
    const carrusel = useCarrusel()

    return (
        <div className={styles.carrusel} ref={contianerRef}>
            {carrusel}
        </div>
    )
}

export default Carrusel
