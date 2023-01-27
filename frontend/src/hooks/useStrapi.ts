import { useEffect } from 'react'
import useFetch, { FetchReturn } from './useFetch'

const contentMap = {
    carrusel: '/',
    carta: '/pages/1?populate%5B0%5D=more_content&populate%5Bmore_content%5D%5Bpopulate%5D=*',
    arxiu: '/arxiu?populate=*',
    testimonis:
        '/testimonis?populate%5Bmore_content%5D%5Bpopulate%5D=*&populate%5Bfoto_destacada%5D=*&populate%5Bavatar%5D=*&populate%5Bfoto_presentacion%5D=*&populate%5Btestimoni_tags%5D=*',
    conversa:
        '/conversa?populate%5Bvideo%5D=*&populate%5Bdownload%5D%5Bpopulate%5D=*',
    documentacio: '/documentacio?populate%5Bdownloads%5D%5Bpopulate%5D=*',
    informacio: '/informacio?populate%5Bmore_content%5D%5Bpopulate%5D=*',
}

const STRAPI_URL_BASE = 'http://tribunal.vigla.city/strapi/api'

type ContentId =
    | 'carrusel'
    | 'carta'
    | 'arxiu'
    | 'conversa'
    | 'documentacio'
    | 'informacio'
    | 'testimonis'

const useStrapi = <T>(contentId: ContentId): FetchReturn<T> => {
    const { content, error } = useFetch<T>(
        `${STRAPI_URL_BASE}${contentMap[contentId]}`
    )

    useEffect(() => {
        console.log({ content })
    }, [content])

    return {
        content,
        error,
    }
}

export default useStrapi
