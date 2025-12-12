import { useState, useCallback, useRef } from 'react'

export function useMediaPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef(null)

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play().catch(error => {
        console.error("Erro ao tentar reproduzir:", error)
        setIsPlaying(false)
      })
    }
    setIsPlaying(prev => !prev)
  }, [isPlaying])

  const stop = useCallback(() => {
    if (!videoRef.current) return

    videoRef.current.pause()
    videoRef.current.currentTime = 0
    setIsPlaying(false)
    setCurrentTime(0)
  }, [])

  const handleTimeUpdate = useCallback((time) => {
    setCurrentTime(time)
  }, [])

  const handleDurationChange = useCallback((newDuration) => {
    setDuration(newDuration)
  }, [])

  const handleEnded = useCallback(() => {
    setIsPlaying(false)
  }, [])

  // Handler para eventos nativos do elemento de vídeo
  const onTimeUpdate = useCallback((e) => {
    handleTimeUpdate(e.currentTarget.currentTime)
  }, [handleTimeUpdate])

  const onLoadedMetadata = useCallback((e) => {
    handleDurationChange(e.currentTarget.duration)
  }, [handleDurationChange])

  return {
    videoRef,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    stop,
    handleTimeUpdate, // Usado para mocks ou sync manual se necessário
    handleDurationChange,
    handleEnded,
    // Event handlers para passar para o elemento <video>
    videoEvents: {
      onTimeUpdate,
      onLoadedMetadata,
      onEnded: handleEnded,
      onPlay: () => setIsPlaying(true),
      onPause: () => setIsPlaying(false)
    }
  }
}

