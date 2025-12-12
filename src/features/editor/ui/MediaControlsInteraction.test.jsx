import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MediaControls } from './MediaControls'

describe('MediaControls Interaction', () => {
  it('calls onPlayPause when clicking Play', () => {
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

  it('calls onStop when clicking Stop', () => {
    const handleStop = vi.fn()
    render(
      <MediaControls 
        percentage={0} 
        isPlaying={true} 
        onPlayPause={() => {}} 
        onStop={handleStop} 
      />
    )
    
    fireEvent.click(screen.getByRole('button', { name: /stop/i }))
    expect(handleStop).toHaveBeenCalled()
  })
})

