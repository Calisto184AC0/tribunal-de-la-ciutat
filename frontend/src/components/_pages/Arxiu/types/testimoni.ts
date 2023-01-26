export interface Testimonis {
    data: TestimoniData[]
    meta: Meta
}

interface Meta {
    pagination: Pagination
}

interface Pagination {
    page: number
    pageSize: number
    pageCount: number
    total: number
}

interface TestimoniData {
    id: number
    attributes: TestimoniAttributes
}

interface TestimoniAttributes {
    name: string
    info: string
    foto_destacada: Foto
    foto_presentacion: Foto
    avatar: Foto
    testimoni_tags: Testimonitags
    more_content: Morecontent[]
}

export interface Morecontent {
    id: number
    __component: string
    title: string
    content?: string
    sound?: Sound
    caption?: any
    images?: Images
}

interface Sound {
    data: SoundData
}

interface SoundData {
    id: number
    attributes: SoundAttributes
}

interface SoundAttributes {
    name: string
    mime: string
    size: number
    url: string
}

interface Images {
    data: FotoData[]
}

interface Testimonitags {
    data: TestimonitagsData[]
}

interface TestimonitagsData {
    id: number
    attributes: TestimonitagsAttributes
}

export interface TestimonitagsAttributes {
    title: string
    tag_id: string
}

interface Foto {
    data?: FotoData
}

interface FotoNoNull {
    data: FotoData
}

interface FotoData {
    id: number
    attributes: FotoAttributes
}

export interface FotoAttributes {
    name: string
    width: number
    height: number
    size: number
    url: string
}
