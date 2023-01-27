import MarkdownRender from '@/components/_general/MarkdownRender'
import { Button, Heading } from '@/components/_ui'
import PageContainer from '@/components/_ui/PageContainer'
import { useIsMobile } from '@/contexts/isMobileContext'
import { PageId } from '@/hooks/useContentReducer/types'
import useStrapi from '@/hooks/useStrapi'
import { Fragment, ReactNode, useEffect, useState } from 'react'
import Testimoni from '../Testimoni'
import TestimoniPreview from './components/TestimoniPreview'
import styles from './styles.module.scss'
import { Arxiu, Testimonis, TestimonitagsAttributes } from './types'

interface ArxiuProps {
    transition: (pageId: PageId, newContent: ReactNode) => void
    returnHandler?: () => void
}

const Arxiu = ({ transition, returnHandler }: ArxiuProps) => {
    const { content: arxiuContent } = useStrapi<Arxiu>('arxiu')
    const { content: testimonisContent } = useStrapi<Testimonis>('testimonis')
    const isMobile = useIsMobile()

    const [tags, setTags] = useState<TestimonitagsAttributes[][]>([])
    const [selectedTag, setSelectedTag] = useState<string[]>([])

    useEffect(() => {
        if (!testimonisContent?.data) return

        let testimoniTagsAPI: TestimonitagsAttributes[] = []
        let testimoniTagsParsed: TestimonitagsAttributes[][] = []

        for (const {
            attributes: {
                testimoni_tags: { data: currentTestimoniTags },
            },
        } of testimonisContent.data) {
            for (const {
                attributes: { tag_id, title },
            } of currentTestimoniTags) {
                if (
                    testimoniTagsAPI.find(
                        ({ tag_id: currentTagId }) => currentTagId === tag_id
                    )
                )
                    continue
                testimoniTagsAPI.push({ tag_id, title })
            }
        }

        testimoniTagsAPI.sort(({ tag_id: firstId }, { tag_id: compareId }) =>
            firstId.localeCompare(compareId)
        )

        let cont = 3
        let auxRow = []
        while (testimoniTagsAPI.length > 0) {
            auxRow.push(testimoniTagsAPI.shift()!)

            if (auxRow.length === cont) {
                testimoniTagsParsed.push(auxRow)
                auxRow = []
                cont = 3
            }

            if (testimoniTagsAPI.length === 1) {
                testimoniTagsParsed.push(auxRow)
            }
        }

        setTags(testimoniTagsParsed)
    }, [testimonisContent])

    if (!arxiuContent?.data || !testimonisContent?.data)
        return <p>Cargando...</p>

    return (
        <PageContainer className={styles.arxiu}>
            {!isMobile && (
                <Heading tag='h1' type='h4'>
                    {arxiuContent.data.attributes.title}
                </Heading>
            )}
            <MarkdownRender
                source={arxiuContent?.data.attributes.introduction}
                components={{
                    h1: ({ node, ...props }) => (
                        <Heading type='h4' tag='h1' {...props} />
                    ),
                }}
            />
            <div className={styles.tags_container}>
                {tags?.map((tagGroup, index) => (
                    <div className={styles.tag_group} key={index}>
                        {tagGroup.map(({ tag_id, title }) => {
                            return (
                                <Button
                                    key={tag_id}
                                    onClick={() => {
                                        if (selectedTag.includes(tag_id)) {
                                            setSelectedTag(
                                                selectedTag.filter(
                                                    tag => tag !== tag_id
                                                )
                                            )
                                        } else {
                                            setSelectedTag([
                                                ...selectedTag,
                                                tag_id,
                                            ])
                                        }
                                    }}
                                >
                                    {title}
                                </Button>
                            )
                        })}
                    </div>
                ))}
            </div>
            <div className={styles.testimonis_container}>
                {testimonisContent?.data.map(
                    ({
                        id,
                        attributes: {
                            name,
                            avatar,
                            foto_presentacion,
                            foto_destacada,
                            info,
                            more_content,
                            testimoni_tags: { data: testimoniTags },
                        },
                    }) => {
                        const isIncluded = testimoniTags.some(
                            ({ attributes: { tag_id } }) =>
                                selectedTag.includes(tag_id)
                        )

                        const showAll = selectedTag.length === 0

                        const isShow = showAll || isIncluded

                        return (
                            <Fragment key={id}>
                                {isShow && (
                                    <TestimoniPreview
                                        key={id}
                                        name={name}
                                        photos={{
                                            avatar: avatar?.data?.attributes,
                                            presentacion:
                                                foto_presentacion!.data!
                                                    .attributes,
                                        }}
                                        onClick={() => {
                                            if (!returnHandler) {
                                                transition(
                                                    PageId.Testimoni,
                                                    <Testimoni
                                                        foto={
                                                            foto_destacada.data
                                                                ?.attributes!
                                                        }
                                                        info={info}
                                                        name={name}
                                                        content={more_content}
                                                        closeHandler={() =>
                                                            transition(
                                                                PageId.Arxiu,
                                                                <Arxiu
                                                                    transition={
                                                                        transition
                                                                    }
                                                                />
                                                            )
                                                        }
                                                    />
                                                )
                                            } else {
                                                transition(
                                                    PageId.Testimoni,
                                                    <Testimoni
                                                        foto={
                                                            foto_destacada.data
                                                                ?.attributes!
                                                        }
                                                        info={info}
                                                        name={name}
                                                        content={more_content}
                                                        closeHandler={
                                                            returnHandler
                                                        }
                                                    />
                                                )
                                            }
                                        }}
                                    />
                                )}
                            </Fragment>
                        )
                    }
                )}
            </div>
        </PageContainer>
    )
}

export default Arxiu
