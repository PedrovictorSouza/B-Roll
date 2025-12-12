import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MediaControls } from './MediaControls'

describe('MediaControls UI', () => {
  it('renders progress bar and controls correctly', () => {
    render(
      <MediaControls 
        percentage={30} 
        isPlaying={false} 
        onPlayPause={() => {}} 
        onStop={() => {}} 
      />
    )
    
    // Progress Bar
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    
    // Buttons
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /stop/i })).toBeInTheDocument()
  })

  it('shows pause button when playing', () => {
    render(
      <MediaControls 
        percentage={30} 
        isPlaying={true} 
        onPlayPause={() => {}} 
        onStop={() => {}} 
      />
    )
    expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument()
  })

  it('calls onPlayPause when play button clicked', () => {
    const handlePlayPause = vi.fn()
    render(
      <MediaControls 
        percentage={0} 
        isPlaying={false} 
        onPlayPause={handlePlayPause} 
        onStop={() => {}} 
      />
    )
    
    fireEvent.click(screen.getByRole('button', { name: /play/i }))
    expect(handlePlayPause).toHaveBeenCalled()
  })
})

