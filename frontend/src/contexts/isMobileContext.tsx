import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'

export const IsMobileContext = createContext(false)

interface IsMobileProviderProps {
    children: ReactNode
}

const IsMobileProvider = ({ children }: IsMobileProviderProps) => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            setIsMobile(entries[0].contentRect.width < 768)
        })

        resizeObserver.observe(document.body)

        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    return (
        <IsMobileContext.Provider value={isMobile}>
            {children}
        </IsMobileContext.Provider>
    )
}

const useIsMobile = () => {
    const isMobile = useContext(IsMobileContext)

    return isMobile
}

export { IsMobileProvider, useIsMobile }
