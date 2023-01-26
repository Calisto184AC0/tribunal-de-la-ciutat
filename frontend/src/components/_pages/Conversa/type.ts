export interface Conversa {
    data: ConversaData
}

interface ConversaData {
    id: number
    attributes: ConversaAttributes
}

interface ConversaAttributes {
    title: string
    slug: string
    video_caption: string
    content: string
    video: Video
    download: Download
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
    ext: string
    mime: string
    size: number
    url: string
}

interface Video {
    data: VideoData
}

interface VideoData {
    id: number
    attributes: VideoAttributes
}

interface VideoAttributes {
    name: string
    ext: string
    mime: string
    size: number
    url: string
}
