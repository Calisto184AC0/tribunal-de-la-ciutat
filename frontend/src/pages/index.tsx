import styles from '@/assets/styles/home.module.scss'
import {
    LinkContainer,
    MenuItem,
    Navigation,
    TransitionContainer,
} from '@/components/_general'
import MobileMenuItem from '@/components/_general/MobileMenuItem'
import MobileNavigation from '@/components/_general/MobileNavigation'
import {
    Arxiu,
    Carrusel,
    Carta,
    Conversa,
    Documentacio,
    Informacio,
} from '@/components/_pages'
import ArxiuConversa from '@/components/_pages/ArxiuConversa'
import { Logo } from '@/components/_ui'
import { useIsMobile } from '@/contexts/isMobileContext'
import useContentReducer from '@/hooks/useContentReducer'
import { PageId } from '@/hooks/useContentReducer/types'
import { LateralDirection } from '@/types'
import { Azeret_Mono } from '@next/font/google'
import localFont from '@next/font/local'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const tagada = localFont({
    src: '../assets/fonts/Tagada-Regular.otf',
    weight: '400',
    style: 'normal',
    variable: '--tagada-font',
})

const azeret = Azeret_Mono({
    subsets: ['latin'],
})

const initialStateDesktop = {
    pageId: PageId.Home,
    content: (
        <>
            <Carta />
            <Carrusel />
        </>
    ),
    newContent: null,
}

const initialStateMobile = {
    pageId: PageId.Carrusel,
    content: <Carrusel />,
    newContent: null,
}

const Home = () => {
    const router = useRouter()

    const isMobile = useIsMobile()

    const [direction, setDirection] = useState<LateralDirection>('left')
    const { content, newContent, pageId, transition, saveState, reset } =
        useContentReducer(isMobile ? initialStateMobile : initialStateDesktop)

    useEffect(() => {
        let resetState

        if (!isMobile) {
            resetState = {
                pageId: PageId.Home,
                content: (
                    <>
                        <Carta />
                        <Carrusel />
                    </>
                ),
            }
        } else {
            resetState = {
                pageId: PageId.Carrusel,
                content: <Carrusel />,
            }
        }

        reset(resetState.pageId, resetState.content)
    }, [isMobile])

    return (
        <div
            className={`${azeret.className} ${tagada.variable} ${styles.layout}`}
        >
            <Logo
                onClick={() => {
                    if (isMobile) return

                    setDirection(prev => (prev === 'left' ? 'right' : 'left'))

                    transition(
                        PageId.Home,
                        <>
                            <Carta />
                            <Carrusel />
                        </>
                    )
                }}
            />
            {!isMobile && (
                <Navigation color='salmon'>
                    <LinkContainer>
                        <MenuItem
                            label='Informació i documentació'
                            onClick={() => {
                                setDirection('right')
                                transition(
                                    PageId.InformacioDocumentacio,
                                    <>
                                        <Documentacio />
                                        <Informacio />
                                    </>
                                )
                            }}
                        />
                    </LinkContainer>
                    <MenuItem label='eng' />
                </Navigation>
            )}
            <TransitionContainer
                content={content}
                newContent={newContent}
                direction={direction}
                transitionEndHandler={() => {
                    // router.push('/arxiu-conversa', undefined, {
                    //     shallow: true,
                    // })
                    saveState()
                }}
            />
            {!isMobile && (
                <Navigation color='orange'>
                    <LinkContainer>
                        <MenuItem
                            label='Arxiu de veus'
                            onClick={() => {
                                setDirection('left')
                                transition(
                                    PageId.ArxiuConversa,
                                    <ArxiuConversa />
                                )
                            }}
                        />
                        <MenuItem
                            label='Conversa Oberta'
                            onClick={() => {
                                setDirection('left')
                                transition(
                                    PageId.ArxiuConversa,
                                    <ArxiuConversa />
                                )
                            }}
                        />
                    </LinkContainer>
                </Navigation>
            )}
            {isMobile && (
                <MobileNavigation>
                    <MobileMenuItem
                        color='gray'
                        label='Carta oberta'
                        currentPageId={pageId}
                        pageId={PageId.Carta}
                        transition={transition}
                        onClick={() => {
                            transition(PageId.Carta, <Carta />)
                        }}
                    />
                    <MobileMenuItem
                        color='orange'
                        label='Arxiu de veus'
                        currentPageId={pageId}
                        pageId={PageId.Arxiu}
                        transition={transition}
                        onClick={() => {
                            transition(
                                PageId.Arxiu,
                                <Arxiu transition={transition} />
                            )
                        }}
                    />
                    <MobileMenuItem
                        color='salmon'
                        label='Gran conversa'
                        currentPageId={pageId}
                        pageId={PageId.Conversa}
                        transition={transition}
                        onClick={() => {
                            transition(PageId.Conversa, <Conversa />)
                        }}
                    />
                    <MobileMenuItem
                        color='purple'
                        label='Informació i documentació'
                        currentPageId={pageId}
                        pageId={PageId.InformacioDocumentacio}
                        transition={transition}
                        onClick={() => {
                            transition(
                                PageId.InformacioDocumentacio,
                                <>
                                    <Informacio />
                                    <Documentacio />
                                </>
                            )
                        }}
                    />
                </MobileNavigation>
            )}
        </div>
    )
}

export default Home
