import textsStyles from '@/assets/styles/texts.module.scss'
import MarkdownRender from '@/components/_general/MarkdownRender'
import RadioPlayer from '@/components/_general/RadioPlayer'
import { Heading } from '@/components/_ui'
import Footer from '@/components/_ui/Footer'
import PageContainer from '@/components/_ui/PageContainer'
import { useIsMobile } from '@/contexts/isMobileContext'
import useStrapi from '@/hooks/useStrapi'
import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Carta } from './types'
import { Audios } from './types/audios'
import { ChapterTagData, ChapterTags } from './types/chapter-tags'

const Carta = () => {
    const { content } = useStrapi<Carta>('carta')
    const { content: tagsContent } = useStrapi<ChapterTags>('chapter_tags')
    const { content: audiosContent } = useStrapi<Audios>('audios')

    const [tagsAndAudioController, setTagsAndAudioController] = useState<
        ChapterTagData[][]
    >([])

    const isMobile = useIsMobile()

    useEffect(() => {
        if (!tagsContent?.data || !audiosContent?.data) return

        if (isMobile) {
            let tagsAndAudioApi = tagsContent.data
            let testimoniTagsParsed: ChapterTagData[][] = []

            let cont = 3
            let auxRow = []
            while (tagsAndAudioApi.length > 0) {
                auxRow.push(tagsAndAudioApi.shift()!)

                if (auxRow.length === cont) {
                    testimoniTagsParsed.push(auxRow)
                    auxRow = []
                    cont = cont === 3 ? 4 : 3
                }

                if (tagsAndAudioApi.length === 1) {
                    testimoniTagsParsed.push(auxRow)
                }
            }

            setTagsAndAudioController(tagsAndAudioController)
        } else {
            const tagsAndAudioController = tagsContent.data
            // ({ attributes: { label, tag_id }, id }) => (
            //     <a
            //         className={textsStyles.etiqueta}
            //         key={`${tag_id}-${id}`}
            //         href={`#${tag_id}`}
            //     >
            //         {label}
            //     </a>
            // )

            setTagsAndAudioController([tagsAndAudioController])
        }
    }, [tagsContent?.data, audiosContent?.data, isMobile])

    if (!content?.data || !tagsContent?.data || !audiosContent?.data)
        return <p>Cargando...</p>

    return (
        <PageContainer className={styles.carta_container}>
            <div className={styles.controler_audio}>
                {tagsAndAudioController.map((tagsAndAudio, index) => (
                    <div key={index} className={styles.controler_audio_row}>
                        {!isMobile && (
                            <RadioPlayer
                                key={`radio-player-${index}`}
                                urls={audiosContent.data.attributes.audios.data.map(
                                    audioData => audioData.attributes.url
                                )}
                            />
                        )}
                        {tagsAndAudio.map(
                            ({ attributes: { label, tag_id }, id }) => (
                                <a
                                    className={textsStyles.etiqueta}
                                    key={`${tag_id}-${id}`}
                                    href={`#${tag_id}`}
                                >
                                    {label}
                                </a>
                            )
                        )}
                    </div>
                ))}
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
            <Footer />
        </PageContainer>
    )
}

export default Carta
