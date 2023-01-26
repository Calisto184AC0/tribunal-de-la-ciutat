import textsStyles from '@/assets/styles/texts.module.scss'
import Image from 'next/image'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'

interface VideoPlayerProps {
    videoUrl: string
    caption?: string
}

const VideoPlayer = ({ videoUrl, caption }: VideoPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const durationRef = useRef<HTMLDivElement>(null)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [userInit, setUserInit] = useState(false)

    const handleProgress = () => {
        if (durationRef.current && videoRef.current) {
            const { duration, currentTime } = videoRef.current
            const percent = (currentTime / duration) * 100
            durationRef.current.style.setProperty('--duration', `${percent}%`)
        }
    }

    useEffect(() => {
        if (!videoRef.current) return

        videoRef.current.onended = () => {
            setIsPlaying(false)
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
            if (durationRef.current) {
                durationRef.current.style.setProperty('--duration', `100%`)
            }
        }
    }, [videoUrl])

    useEffect(() => {
        if (!videoRef.current || !userInit) return

        if (isPlaying) {
            videoRef.current.play()
            intervalRef.current = setInterval(handleProgress, 1000)
        } else {
            videoRef.current.pause()
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [isPlaying, userInit])

    useEffect(() => {
        if (!videoRef.current) return

        if (userInit) {
            videoRef.current.volume = 1
            videoRef.current.currentTime = 0
            setIsPlaying(true)
        } else {
            videoRef.current.play()
            videoRef.current.volume = 0
        }
    }, [userInit])

    const handlePlayPause = () => {
        if (videoRef.current) {
            setIsPlaying(!isPlaying)
        }
    }

    const handleChangeTime = (e: MouseEvent<HTMLDivElement>) => {
        if (videoRef.current) {
            const { duration } = videoRef.current
            const { left, width } = e.currentTarget.getBoundingClientRect()
            const percent = (e.clientX - left) / width
            videoRef.current.currentTime = duration * percent
            handleProgress()
        }
    }

    return (
        <div className={styles.video_container}>
            <div className={styles.controls_container}>
                <video src={videoUrl} autoPlay loop ref={videoRef} />
                {!userInit ? (
                    <div
                        className={styles.user_init}
                        onClick={() => setUserInit(true)}
                    >
                        <Image
                            src='/icon/play_icon_sin_circulo.svg'
                            alt='play'
                            width={50}
                            height={50}
                        />
                    </div>
                ) : (
                    <div className={styles.controls}>
                        <Image
                            src={
                                isPlaying
                                    ? '/icon/pause_icon_sin_circulo.svg'
                                    : '/icon/play_icon_sin_circulo.svg'
                            }
                            alt='play'
                            width={20}
                            height={20}
                            onClick={handlePlayPause}
                            style={{ cursor: 'pointer' }}
                        />
                        <div
                            className={styles.duration}
                            onClick={handleChangeTime}
                            ref={durationRef}
                        ></div>
                    </div>
                )}
            </div>
            {caption && (
                <span className={`${styles.caption} ${textsStyles.pequeno}`}>
                    {caption}
                </span>
            )}
        </div>
    )
}

export default VideoPlayer
