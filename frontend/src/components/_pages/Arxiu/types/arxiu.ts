export interface Arxiu {
    data: Data
}

interface Data {
    id: number
    attributes: Attributes
}

interface Attributes {
    title: string
    slug: string
    introduction: string
}
