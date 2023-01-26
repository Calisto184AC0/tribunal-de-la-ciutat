interface CarruselAPI {
    data: CarruselData
}

interface CarruselData {
    id: number
    attributes: CarruselAttributes
}

interface CarruselAttributes {
    locale: string
    carrusel: CarruselImage[]
}

export interface CarruselImage {
    id: number
    alt_text?: string
    image: Image
}

interface Image {
    data: ImageData
}

interface ImageData {
    id: number
    attributes: ImageAttributes
}

interface ImageAttributes {
    name: string
    width: number
    height: number
    formats?: Formats
    hash: string
    ext: string
    mime: string
    size: number
    url: string
}

interface Formats {
    thumbnail: ImageAttributes
    small: ImageAttributes
    medium?: ImageAttributes
    large?: ImageAttributes
}

export default CarruselAPI
