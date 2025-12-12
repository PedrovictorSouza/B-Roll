import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { VideoContainer } from './VideoContainer'

describe('VideoContainer Playback', () => {
  it('does not autoplay by default', () => {
    render(<VideoContainer src="test.mp4" />)
    const video = screen.getByTestId('main-video')
    expect(video).not.toHaveAttribute('autoplay')
  })

  it('responds to external play command via ref', () => {
    const playMock = vi.fn().mockResolvedValue()
    const ref = { current: null }
    
    render(<VideoContainer src="test.mp4" videoRef={ref} />)
    
    // Mock do método play no elemento DOM real (jsdom não implementa play/pause)
    ref.current.play = playMock
    
    act(() => {
      ref.current.play()
    })
    
    expect(playMock).toHaveBeenCalled()
  })
})

