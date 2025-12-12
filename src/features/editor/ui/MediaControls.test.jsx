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
        currentTime={65}
        duration={120}
      />
    )
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument()
    
    // Verifica display de tempo
    expect(screen.getByText('01:05 / 02:00')).toBeInTheDocument()
  })

  // ... (outros testes existentes)
})
