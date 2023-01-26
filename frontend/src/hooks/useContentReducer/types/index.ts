import { ReactNode } from 'react'

export enum PageId {
    Home = 'home',
    ArxiuConversa = 'arxiu_conversa',
    InformacioDocumentacio = 'informacio_documentacio',
    Carta = 'carta',
    Carrusel = 'carrusel',
    Arxiu = 'arxiu',
    Conversa = 'conversa',
    Testimoni = 'testimoni',
}

export enum ActionType {
    Transition = 'TRANSITION',
    Save = 'SAVE_STATE',
    Reset = 'RESET_STATE',
}

export interface State {
    pageId: PageId
    content: ReactNode
    newContent: ReactNode
}

interface ActionPayload {
    pageId: PageId
    newContent: ReactNode
}

export interface Action {
    type: ActionType
    payload?: ActionPayload
}
