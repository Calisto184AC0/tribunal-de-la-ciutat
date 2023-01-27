import Image from 'next/image'
import { SyntheticEvent, useEffect, useRef, useState } from 'react'

interface RadioPlayerProps {
    urls: string[]
}

const RadioPlayer = ({ urls }: RadioPlayerProps) => {
    const [currentAudioIndex, setCurrentAudioIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [timeOutId, setTimeOutId] = useState<number | null>(null)

    const audioRef = useRef<HTMLAudioElement>(null)

    const handleAudioEnded = () => {
        setCurrentAudioIndex((currentAudioIndex + 1) % urls.length)
    }

    const fadeIn = (
        audio: HTMLAudioElement,
        fadeTime: number,
        intervalStep = 100
    ) => {
        const volumeStep = intervalStep / fadeTime

        const fadeInIntervalId = setInterval(() => {
            if (audio.volume < 1) {
                const newVolume = Math.min(audio.volume + volumeStep, 1)
                audio.volume = newVolume
            } else {
                clearInterval(fadeInIntervalId)
            }
        }, intervalStep)
    }

    const fadeOut = (
        audio: HTMLAudioElement,
        fadeTime: number,
        intervalStep = 100
    ) => {
        const volumeStep = intervalStep / fadeTime

        const fadeOutIntervalId = setInterval(() => {
            if (audio.volume > 0) {
                const newVolume = Math.max(audio.volume - volumeStep, 0)
                audio.volume = newVolume
            } else {
                clearInterval(fadeOutIntervalId)
            }
        }, intervalStep)
    }

    const handleAudioPlay = (e: SyntheticEvent<HTMLAudioElement>) => {
        const audio = e.target as HTMLAudioElement
        audio.volume = 0

        const fadeTime = 1000

        fadeIn(audio, fadeTime)

        setTimeOutId(
            setTimeout(() => {
                fadeOut(audio, fadeTime)
            }, (audio.duration - audio.currentTime) * 1000 - fadeTime) as any
        )
    }

    const handleAudioPause = () => {
        if (timeOutId) {
            clearTimeout(timeOutId)
        }
    }

    useEffect(() => {
        if (!audioRef.current) return

        audioRef.current.src = urls[currentAudioIndex]

        return () => {
            audioRef.current?.pause()
        }
    }, [currentAudioIndex])

    const handlePlay = () => {
        if (!audioRef.current) return

        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }

        setIsPlaying(!isPlaying)
    }

    return (
        <>
            <audio
                autoPlay
                onEnded={handleAudioEnded}
                onPlay={handleAudioPlay}
                onPause={handleAudioPause}
                ref={audioRef}
            >
                <source
                    src={`http://tribunal.vigla.city/strapi${urls[0]}`}
                    type='audio/mpeg'
                />
            </audio>
            <Image
                src={
                    isPlaying
                        ? '/icon/boton sin volumen.svg'
                        : '/icon/boton con volumen.svg'
                }
                alt='Radio Player'
                width={32}
                height={32}
                onClick={() => setIsPlaying(!isPlaying)}
            />
        </>
    )
}
export default RadioPlayer
