import textsStyles from '@/assets/styles/texts.module.scss'
import MarkdownRender from '@/components/_general/MarkdownRender'
import { Heading } from '@/components/_ui'
import PageContainer from '@/components/_ui/PageContainer'
import useStrapi from '@/hooks/useStrapi'
import styles from './styles.module.scss'
import { Carta } from './types'

const Carta = () => {
    const { content } = useStrapi<Carta>('carta')

    if (!content?.data) return <p>Cargando...</p>

    return (
        <PageContainer className={styles.carta_container}>
            <span className={`${textsStyles.normal} ${styles.time_stamp}`}>
                {content?.data.attributes.more_content[0].timestamp?.replace(
                    '\\n',
                    '\n'
                )}
            </span>
            <MarkdownRender
                source={content?.data.attributes.more_content[1].content!}
            />
            {content?.data.attributes.more_content.map(
                ({ id, __component, title, content, chapter_tag }) => {
                    if (__component !== 'content.text-block') return

                    return (
                        <div className={styles.text_block} key={id}>
                            <Heading
                                type='h5'
                                tag='h2'
                                id={chapter_tag?.data.attributes.tag_id}
                            >
                                {title}
                            </Heading>
                            <MarkdownRender source={content!} />
                        </div>
                    )
                }
            )}
        </PageContainer>
    )
}

export default Carta
