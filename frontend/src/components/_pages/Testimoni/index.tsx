import headingsStyles from '@/assets/styles/headings.module.scss'
import AudioPlayer from '@/components/_general/AudioPlayer'
import MarkdownRender from '@/components/_general/MarkdownRender'
import { Heading } from '@/components/_ui'
import PageContainer from '@/components/_ui/PageContainer'
import Image from 'next/image'
import { FotoAttributes, Morecontent } from '../Arxiu/types'
import styles from './styles.module.scss'

interface TestimoniProps {
    name: string
    foto: FotoAttributes
    info: string
    content: Morecontent[]
    closeHandler: () => void
}

const Testimoni = ({
    name,
    foto,
    info,
    content,
    closeHandler,
}: TestimoniProps) => {
    return (
        <PageContainer className={styles.testimoni_container}>
            <span className={styles.close} onClick={closeHandler}>
                <Image
                    src='/icon/close_icon.svg'
                    alt='Botón para cerrar'
                    width={20}
                    height={20}
                />
            </span>
            <Heading type='h1' tag='h2' className={styles.text_center}>
                {name}
            </Heading>
            <Image
                src={`http://tribunal.vigla.city/strapi${foto.url}`}
                alt={`Foto destacada de ${name}`}
                width={foto.width}
                height={foto.height}
                className={styles.foto_destacada}
            />
            <span className={`${headingsStyles.h3} ${styles.text_center}`}>
                {info}
            </span>
            {content.map(({ __component, id, ...attributes }) => {
                if (__component === 'content.image') {
                    const { images } = attributes

                    return (
                        <div
                            key={`${__component}-${id}}`}
                            className={styles.gallery}
                            style={{
                                gridTemplateColumns: `repeat(${
                                    images!.data.length >= 2 ? 2 : 1
                                }, 1fr)`,
                            }}
                        >
                            {images?.data.map(
                                ({
                                    id,
                                    attributes: { url, height, width, name },
                                }) => {
                                    return (
                                        <Image
                                            key={`${name}-${id}`}
                                            src={`http://tribunal.vigla.city/strapi${url}`}
                                            alt={`Foto`}
                                            width={width}
                                            height={height}
                                        />
                                    )
                                }
                            )}
                        </div>
                    )
                } else if (__component === 'content.extract') {
                    const { sound, title, content } = attributes

                    return (
                        <div
                            key={`${__component}-${id}`}
                            className={styles.extract}
                        >
                            <AudioPlayer src={sound!.data.attributes.url} />
                            <Heading type='h5' tag='h2'>
                                {title}
                            </Heading>
                            <MarkdownRender source={content!} />
                        </div>
                    )
                }
            })}
        </PageContainer>
    )
}

export default Testimoni
