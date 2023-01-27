import textsStyles from '@/assets/styles/texts.module.scss'
import MarkdownRender from '@/components/_general/MarkdownRender'
import { Heading } from '@/components/_ui'
import PageContainer from '@/components/_ui/PageContainer'
import useStrapi from '@/hooks/useStrapi'
import styles from './styles.module.scss'
import { Carta } from './types'
import { Audios } from './types/audios'
import { ChapterTags } from './types/chapter-tags'

const Carta = () => {
    const { content } = useStrapi<Carta>('carta')
    const { content: tagsContent } = useStrapi<ChapterTags>('chapter_tags')
    const { content: audiosContent } = useStrapi<Audios>('audios')

    if (!content?.data || !tagsContent?.data || !audiosContent?.data)
        return <p>Cargando...</p>

    return (
        <PageContainer className={styles.carta_container}>
            <div className={styles.controler_audio}>
                {tagsContent.data.map(
                    ({ attributes: { label, tag_id }, id }) => (
                        <a key={`${tag_id}-${id}`} href={`#${tag_id}`}>
                            {label}
                        </a>
                    )
                )}
            </div>
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
