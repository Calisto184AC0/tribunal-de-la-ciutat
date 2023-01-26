export interface Documentacio {
    data: DocumentacioData
}

interface DocumentacioData {
    id: number
    attributes: DocumentacioAttributes
}

interface DocumentacioAttributes {
    title: string
    slug: string
    content: string
    downloads: Download[]
}

interface Download {
    id: number
    title: string
    files: File
}

interface File {
    data: FileData
}

interface FileData {
    id: number
    attributes: FileAttributes
}

interface FileAttributes {
    name: string
    size: number
    url: string
}
