export interface Audios {
    data: AudiosData
}

interface AudiosData {
    id: number
    attributes: AudiosAttributes
}

interface AudiosAttributes {
    audios: AudiosElem
}

interface AudiosElem {
    data: AudioData[]
}

interface AudioData {
    id: number
    attributes: AudioAttributes
}

interface AudioAttributes {
    name: string
    url: string
}
