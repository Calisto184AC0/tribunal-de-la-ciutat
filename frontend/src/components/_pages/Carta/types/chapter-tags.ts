export interface ChapterTags {
    data: ChapterTagData[]
}

export interface ChapterTagData {
    id: number
    attributes: ChapterTagAttributes
}

interface ChapterTagAttributes {
    label: string
    tag_id: string
}
