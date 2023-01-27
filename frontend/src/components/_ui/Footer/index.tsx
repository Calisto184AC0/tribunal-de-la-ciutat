import { MarkdownRender } from '@/components/_general'
import useStrapi from '@/hooks/useStrapi'
import Image from 'next/image'
import Text from '../Text'
import styles from './styles.module.scss'
import { Footer } from './type'

const Footer = () => {
    const { content } = useStrapi<Footer>('footer')

    if (!content) return <p>Cargando...</p>

    return (
        <footer className={styles.footer}>
            <MarkdownRender
                components={{
                    p: ({ node, ...props }) => (
                        <Text
                            className={styles.p_block}
                            type='pequeno'
                            {...props}
                        />
                    ),
                }}
                source={content.data.attributes.content}
            />
            <div className={styles.logos}>
                <div className={styles.logos_izq}>
                    {content.data.attributes.logos_izq.data.map(
                        ({ attributes: { height, url, width, name }, id }) => (
                            <Image
                                key={`${id}-${name}`}
                                src={`http://tribunal.vigla.city/strapi${url}`}
                                alt={name}
                                width={width}
                                height={height}
                            />
                        )
                    )}
                </div>
                <Image
                    src={`http://tribunal.vigla.city/strapi${content.data.attributes.logo_ajuntament.data.attributes.url}`}
                    alt={
                        content.data.attributes.logo_ajuntament.data.attributes
                            .name
                    }
                    width={
                        content.data.attributes.logo_ajuntament.data.attributes
                            .width
                    }
                    height={
                        content.data.attributes.logo_ajuntament.data.attributes
                            .height
                    }
                />
            </div>
        </footer>
    )
}

export default Footer
