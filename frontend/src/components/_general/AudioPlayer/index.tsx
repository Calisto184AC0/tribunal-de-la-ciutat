import Image from 'next/image'
import {
    ComponentPropsWithoutRef,
    MouseEvent,
    useEffect,
    useRef,
    useState,
} from 'react'
import styles from './styles.module.scss'

interface AudioPlayerProps extends ComponentPropsWithoutRef<'div'> {
    src: string
}

const AudioPlayer = ({ src }: AudioPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
    const durationRef = useRef<HTMLDivElement>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const handleProgress = () => {
        if (durationRef.current && audio) {
            const { duration, currentTime } = audio
            const percent = (currentTime / duration) * 100
            durationRef.current.style.setProperty('--duration', `${percent}%`)
        }
    }

    useEffect(() => {
        const audio = new Audio(`http://tribunal.vigla.city/strapi${src}`)
        audio.onended = () => {
            setIsPlaying(false)
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
            if (durationRef.current) {
                durationRef.current.style.setProperty('--duration', `100%`)
            }
        }
        setAudio(audio)

        return () => {
            audio.pause()
            audio.onended = null
            audio.onprogress = null
        }
    }, [src])

    useEffect(() => {
        if (audio) {
            if (isPlaying) {
                audio.play()
                intervalRef.current = setInterval(handleProgress, 1000)
            } else {
                audio.pause()
                if (intervalRef.current) {
                    clearInterval(intervalRef.current)
                }
            }
        }
    }, [isPlaying])

    const handlePlayPause = () => {
        if (audio) {
            if (isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handleChangeTime = (e: MouseEvent<HTMLDivElement>) => {
        if (audio) {
            const { duration } = audio
            const { left, width } = e.currentTarget.getBoundingClientRect()
            const percent = (e.clientX - left) / width
            audio.currentTime = duration * percent
            handleProgress()
        }
    }

    return (
        <div className={styles.player}>
            <Image
                src={isPlaying ? '/icon/pause_icon.svg' : '/icon/play_icon.svg'}
                alt='Botón para reproducir'
                width={80}
                height={80}
                onClick={handlePlayPause}
                style={{ cursor: 'pointer' }}
            />
            <div
                className={styles.duration}
                onClick={handleChangeTime}
                ref={durationRef}
            ></div>
        </div>
    )
}

export default AudioPlayer
