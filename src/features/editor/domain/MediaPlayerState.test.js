import { describe, it, expect } from 'vitest'
import { MediaPlayerState } from './MediaPlayerState'

describe('MediaPlayerState Entity', () => {
  it('should initialize with paused state and default volume', () => {
    const player = new MediaPlayerState()
    expect(player.isPlaying).toBe(false)
    expect(player.volume).toBe(1.0)
  })

  it('should toggle play/pause correctly', () => {
    const player = new MediaPlayerState()
    
    player.play()
    expect(player.isPlaying).toBe(true)
    
    player.pause()
    expect(player.isPlaying).toBe(false)
  })

  it('should stop correctly (pause and reset logic if needed)', () => {
    const player = new MediaPlayerState()
    player.play()
    player.stop()
    expect(player.isPlaying).toBe(false)
  })

  it('should adjust volume within 0 and 1', () => {
    const player = new MediaPlayerState()
    
    player.setVolume(0.5)
    expect(player.volume).toBe(0.5)
    
    player.setVolume(1.5)
    expect(player.volume).toBe(1.0)
    
    player.setVolume(-0.5)
    expect(player.volume).toBe(0.0)
  })
})

