export interface Carta {
    data: CartaData
}

interface CartaData {
    id: number
    attributes: CartaAttributes
}

interface CartaAttributes {
    title: string
    slug: string
    more_content: Morecontent[]
}

interface Morecontent {
    id: number
    __component: string
    timestamp?: string
    content?: string
    title?: string
    chapter_tag?: ChapterTag
    files?: Files
}

interface Files {
    data: FilesData
}

interface FilesData {
    id: number
    attributes: FilesAttributes
}

interface FilesAttributes {
    name: string
    size: number
    url: string
}

interface ChapterTag {
    data: ChapterTagData
}

interface ChapterTagData {
    id: number
    attributes: ChapterTagAttributes
}

interface ChapterTagAttributes {
    label: string
    tag_id: string
}
