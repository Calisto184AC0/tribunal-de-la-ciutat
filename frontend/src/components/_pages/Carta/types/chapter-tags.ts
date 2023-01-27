export interface ChapterTags {
    data: ChapterTagData[]
}

interface ChapterTagData {
    id: number
    attributes: ChapterTagAttributes
}

interface ChapterTagAttributes {
    label: string
    tag_id: string
}
