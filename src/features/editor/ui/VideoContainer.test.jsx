import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { VideoContainer } from './VideoContainer'

describe('VideoContainer UI', () => {
  it('renders video element with correct src', () => {
    const src = 'test-video.mp4'
    render(<VideoContainer src={src} />)
    const video = screen.getByTestId('main-video')
    expect(video).toBeInTheDocument()
    expect(video).toHaveAttribute('src', src)
  })

  it('passes videoRef to video element', () => {
    const src = 'test.mp4'
    const ref = { current: null }
    render(<VideoContainer src={src} videoRef={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLVideoElement)
  })

  it('attaches event handlers correctly', () => {
    const events = {
      onTimeUpdate: vi.fn(),
      onLoadedMetadata: vi.fn(),
      onEnded: vi.fn(),
      onPlay: vi.fn(),
      onPause: vi.fn()
    }
    
    render(<VideoContainer src="test.mp4" events={events} />)
    const video = screen.getByTestId('main-video')
    
    fireEvent.timeUpdate(video)
    expect(events.onTimeUpdate).toHaveBeenCalled()
    
    fireEvent.loadedMetadata(video)
    expect(events.onLoadedMetadata).toHaveBeenCalled()
  })

  it('shows error message on load error', () => {
    render(<VideoContainer src="invalid.mov" />)
    const video = screen.getByTestId('main-video')
    fireEvent.error(video)
    expect(screen.getByText(/erro ao carregar vídeo/i)).toBeInTheDocument()
  })
})
