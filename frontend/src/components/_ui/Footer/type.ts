export interface Footer {
    data: FooterData
}

interface FooterData {
    id: number
    attributes: FooterAttributes
}

interface FooterAttributes {
    content: string
    logos_izq: Logosizq
    logo_ajuntament: Logoajuntament
}

interface Logoajuntament {
    data: LogoData
}

interface Logosizq {
    data: LogoData[]
}

interface LogoData {
    id: number
    attributes: LogoAttributes
}

interface LogoAttributes {
    name: string
    width: number
    height: number
    url: string
}
