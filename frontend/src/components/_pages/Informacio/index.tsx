import { MarkdownRender } from '@/components/_general'
import { Heading, Text } from '@/components/_ui'
import PageContainer from '@/components/_ui/PageContainer'
import useStrapi from '@/hooks/useStrapi'
import Image from 'next/image'
import styles from './styles.module.scss'
import { Informacio } from './type'

const Informacio = () => {
    const { content } = useStrapi<Informacio>('informacio')

    if (!content?.data) return <p>Cargando...</p>

    return (
        <PageContainer className={styles.container}>
            <Heading tag='h1' type='h4'>
                {content.data.attributes.title}
            </Heading>
            <MarkdownRender
                source={content.data.attributes.content}
                components={{
                    h1: ({ children }) => (
                        <Heading type='h3' tag='h2'>
                            {children}
                        </Heading>
                    ),
                }}
            />
            {content.data.attributes.more_content.map(
                ({ __component, id, ...props }) => {
                    if (__component === 'content.image') {
                        const { images, caption } = props

                        return (
                            <div key={id} className={styles.imagen}>
                                {images?.data.map(
                                    ({
                                        attributes: { height, width, url },
                                        id,
                                    }) => (
                                        <Image
                                            key={`${__component}-img-${id}`}
                                            src={`http://tribunal.vigla.city/strapi${url}`}
                                            alt={caption!}
                                            width={width}
                                            height={height}
                                        />
                                    )
                                )}
                                <Text type='pequeno' tag='span'>
                                    {caption}
                                </Text>
                            </div>
                        )
                    } else if (__component === 'content.text-block') {
                        const { content, title } = props

                        return (
                            <div className={styles.text_block} key={id}>
                                <Heading type='h5' tag='h2'>
                                    {title}
                                </Heading>
                                <MarkdownRender source={content!} />
                            </div>
                        )
                    }

                    return <></>
                }
            )}
        </PageContainer>
    )
}

export default Informacio
