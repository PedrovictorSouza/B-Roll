import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useMediaPlayer } from './useMediaPlayer'

describe('useMediaPlayer Playback Control', () => {
  it('resets state when video ends', () => {
    const { result } = renderHook(() => useMediaPlayer())
    
    // Simula play
    act(() => {
      result.current.videoEvents.onPlay()
    })
    expect(result.current.isPlaying).toBe(true)

    // Simula fim
    act(() => {
      result.current.videoEvents.onEnded()
    })
    expect(result.current.isPlaying).toBe(false)
  })

  it('updates time state on timeUpdate event', () => {
    const { result } = renderHook(() => useMediaPlayer())
    
    act(() => {
      result.current.videoEvents.onTimeUpdate({ currentTarget: { currentTime: 15.5 } })
    })
    expect(result.current.currentTime).toBe(15.5)
  })
})

