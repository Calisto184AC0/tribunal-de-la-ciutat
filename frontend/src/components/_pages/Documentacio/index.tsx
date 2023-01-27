import { MarkdownRender } from '@/components/_general'
import { DownloadButton, Heading } from '@/components/_ui'
import Footer from '@/components/_ui/Footer'
import PageContainer from '@/components/_ui/PageContainer'
import { useIsMobile } from '@/contexts/isMobileContext'
import useStrapi from '@/hooks/useStrapi'
import styles from './styles.module.scss'
import { Documentacio } from './type'

const Documentacio = () => {
    const { content } = useStrapi<Documentacio>('documentacio')
    const isMobile = useIsMobile()

    if (!content?.data) return <p>Cargando...</p>

    return (
        <PageContainer className={styles.container}>
            {!isMobile && (
                <Heading tag='h1' type='h4'>
                    {content.data.attributes.title}
                </Heading>
            )}
            <MarkdownRender source={content.data.attributes.content} />
            <div className={styles.downloads}>
                {content.data.attributes.downloads.map(
                    ({
                        files: {
                            data: {
                                attributes: { url, name },
                            },
                        },
                        id,
                        title,
                    }) => (
                        <DownloadButton
                            fileData={url}
                            key={`download-${id}`}
                            fileName={name}
                            label={title}
                        />
                    )
                )}
            </div>
            <Footer />
        </PageContainer>
    )
}

export default Documentacio
