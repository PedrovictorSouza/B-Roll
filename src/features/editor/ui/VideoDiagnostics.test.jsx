import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { VideoContainer } from './VideoContainer'

describe('VideoContainer Diagnostics', () => {
  it('renders video element but triggers error on invalid source (mock text file)', () => {
    // Simulamos o cenário atual onde o src aponta para um arquivo de texto 'mock'
    // O navegador vai tentar carregar e disparar o evento 'error'
    render(<VideoContainer src="video1.mov" />)
    
    const video = screen.getByTestId('main-video')
    expect(video).toBeInTheDocument()
    
    // Dispara erro manualmente para simular o comportamento do browser ao encontrar arquivo inválido
    fireEvent.error(video)
    
    // Verifica se a mensagem de erro é exibida
    expect(screen.getByText(/Erro ao carregar vídeo/i)).toBeInTheDocument()
  })

  it('stays in video state if error does not occur (happy path simulation)', () => {
    render(<VideoContainer src="valid-video.mp4" />)
    const video = screen.getByTestId('main-video')
    expect(video).toBeVisible()
    expect(screen.queryByText(/Erro ao carregar vídeo/i)).not.toBeInTheDocument()
  })

  it('handles empty src gracefully', () => {
    render(<VideoContainer src="" />)
    // Dependendo da implementação, pode mostrar erro ou vídeo vazio.
    // Pela implementação atual, renderiza <video src="">, o que pode causar erro no browser.
    const video = screen.getByTestId('main-video')
    fireEvent.error(video)
    expect(screen.getByText(/Erro ao carregar vídeo/i)).toBeInTheDocument()
  })
})

