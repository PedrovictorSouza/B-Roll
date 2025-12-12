import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useMediaPlayer } from './useMediaPlayer'

describe('useMediaPlayer Hook', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useMediaPlayer())
    expect(result.current.isPlaying).toBe(false)
    expect(result.current.currentTime).toBe(0)
    expect(result.current.duration).toBe(0)
  })

  it('should toggle play/pause correctly interacting with video ref', () => {
    const { result } = renderHook(() => useMediaPlayer())
    
    // Mock do elemento de vídeo
    const playMock = vi.fn().mockResolvedValue()
    const pauseMock = vi.fn()
    result.current.videoRef.current = {
      play: playMock,
      pause: pauseMock
    }

    // Toggle Play
    act(() => {
      result.current.togglePlay()
    })
    // No código, isPlaying inverte imediatamente, depois chama play(). 
    // O evento onPlay do vídeo confirmaria o state, mas aqui estamos testando a lógica do hook.
    // O hook atualiza o state isPlaying optimisticamente ou espera evento?
    // Verificando implementação: setIsPlaying(prev => !prev) roda direto.
    expect(result.current.isPlaying).toBe(true)
    expect(playMock).toHaveBeenCalled()

    // Toggle Pause
    act(() => {
      result.current.togglePlay()
    })
    expect(result.current.isPlaying).toBe(false)
    expect(pauseMock).toHaveBeenCalled()
  })

  it('should stop video', () => {
    const { result } = renderHook(() => useMediaPlayer())
    
    const pauseMock = vi.fn()
    result.current.videoRef.current = {
      pause: pauseMock,
      currentTime: 10
    }

    // Estado inicial simulado
    act(() => {
      // Simula playing
      result.current.videoEvents.onPlay()
      result.current.handleTimeUpdate(10)
    })

    act(() => {
      result.current.stop()
    })

    expect(result.current.isPlaying).toBe(false)
    expect(result.current.currentTime).toBe(0)
    expect(pauseMock).toHaveBeenCalled()
    expect(result.current.videoRef.current.currentTime).toBe(0)
  })

  it('should update duration via event handler', () => {
    const { result } = renderHook(() => useMediaPlayer())
    
    act(() => {
      result.current.videoEvents.onLoadedMetadata({ currentTarget: { duration: 120 } })
    })
    expect(result.current.duration).toBe(120)
  })
})
