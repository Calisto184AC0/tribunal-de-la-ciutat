import '@/assets/styles/globals.scss'
import { IsMobileProvider } from '@/contexts/isMobileContext'
import type { AppProps } from 'next/app'
import Head from 'next/head'

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <title>Tribunal de la Ciutat</title>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
            </Head>
            <IsMobileProvider>
                <Component {...pageProps} />
            </IsMobileProvider>
        </>
    )
}

export default App
