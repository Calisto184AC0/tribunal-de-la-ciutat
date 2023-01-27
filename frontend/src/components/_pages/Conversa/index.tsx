import MarkdownRender from '@/components/_general/MarkdownRender'
import VideoPlayer from '@/components/_general/VideoPlayer'
import { DownloadButton, Heading, Text } from '@/components/_ui'
import PageContainer from '@/components/_ui/PageContainer'
import { useIsMobile } from '@/contexts/isMobileContext'
import useStrapi from '@/hooks/useStrapi'
import styles from './styles.module.scss'
import { Conversa } from './type'

const Conversa = () => {
    const { content } = useStrapi<Conversa>('conversa')
    const isMobile = useIsMobile()

    if (!content?.data) return <p>Cargando...</p>

    return (
        <PageContainer className={styles.conversa}>
            {!isMobile && (
                <Heading tag='h1' type='h4'>
                    {content.data.attributes.title}
                </Heading>
            )}
            <VideoPlayer
                videoUrl={`http://tribunal.vigla.city/strapi${content.data.attributes.video.data.attributes.url}`}
                caption={content.data.attributes.video_caption}
            />
            <div className={styles.content}>
                <MarkdownRender
                    source={content.data.attributes.content}
                    components={{
                        h1: ({ node, ...props }) => (
                            <Heading type='h1' tag='h2' {...props} />
                        ),
                        p: ({ node, ...props }) => (
                            <Text
                                type='normal'
                                className={styles.text}
                                {...props}
                            />
                        ),
                    }}
                />
            </div>
            <DownloadButton
                label={content.data.attributes.download.title}
                fileData={
                    content.data.attributes.download.files.data.attributes.url
                }
                fileName={
                    content.data.attributes.download.files.data.attributes.name
                }
            />
        </PageContainer>
    )
}

export default Conversa
