export interface Informacio {
    data: InformacioData
}

interface InformacioData {
    id: number
    attributes: InformacioAttributes
}

interface InformacioAttributes {
    title: string
    slug: string
    content: string
    locale: string
    more_content: Morecontent[]
}

interface Morecontent {
    id: number
    __component: string
    title: string
    caption?: string
    images?: Images
    content?: string
}

interface Images {
    data: Datum[]
}

interface Datum {
    id: number
    attributes: Attributes
}

interface Attributes {
    name: string
    width: number
    height: number
    size: number
    url: string
}
