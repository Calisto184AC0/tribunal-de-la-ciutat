import textStyles from '@/assets/styles/texts.module.scss'
import styles from './styles.module.scss'

interface DownloadButtonProps {
    label: string
    fileName: string
    fileData: string
}

const DownloadButton = ({ label, fileName, fileData }: DownloadButtonProps) => {
    const downloadFile = () => {
        fetch(`${process.env.HOST_STRAPI}${fileData}`)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]))
                const link = document.createElement('a')
                link.href = url
                link.download = fileName
                document.body.appendChild(link)
                link.click()
                link.parentNode?.removeChild(link)
            })
    }

    return (
        <button
            onClick={downloadFile}
            className={`${styles.download} ${textStyles.etiqueta}`}
        >
            {label}
        </button>
    )
}

export default DownloadButton
