import headingsStyles from '@/assets/styles/headings.module.scss'
import Image from 'next/image'
import { ComponentPropsWithoutRef } from 'react'
import { FotoAttributes } from '../../types'
import styles from './styles.module.scss'

interface TestimoniPhotos {
    presentacion: FotoAttributes
    avatar?: FotoAttributes
}

interface TestimoniPreviewProps extends ComponentPropsWithoutRef<'div'> {
    photos: TestimoniPhotos
    name: string
}

const TestimoniPreview = ({
    photos,
    name,
    ...props
}: TestimoniPreviewProps) => {
    return (
        <div className={styles.testimoni_preview} {...props}>
            <Image
                src={`http://tribunal.vigla.city/strapi${photos.presentacion.url}`}
                alt={`Foto de presentación de ${name}`}
                width={photos.presentacion.width}
                height={photos.presentacion.height}
                className={styles.presentacion_img}
            />
            {photos.avatar && (
                <Image
                    src={`http://tribunal.vigla.city/strapi${photos.avatar.url}`}
                    alt={`Foto avatar de ${name}`}
                    width={photos.avatar.width}
                    height={photos.avatar.height}
                    className={styles.avatar_img}
                />
            )}
            <div
                className={`${styles.cover} ${
                    photos.avatar ? styles.with_avatar : styles.without_avatar
                } ${headingsStyles.h1}`}
            >
                {name}
            </div>
        </div>
    )
}

export default TestimoniPreview
