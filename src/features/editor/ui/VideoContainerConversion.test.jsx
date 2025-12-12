import { render, screen, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { VideoContainer } from './VideoContainer'
import { FFmpegAdapter } from '../infrastructure/adapters/FFmpegAdapter'

// Mock do Adapter com controle de resolução para testar estado de loading
let resolveTranscode

vi.mock('../infrastructure/adapters/FFmpegAdapter', () => {
  return {
    FFmpegAdapter: vi.fn().mockImplementation(() => ({
      transcode: vi.fn().mockImplementation(() => {
        // Retorna nova promise que podemos controlar externamente
        return new Promise(resolve => {
          resolveTranscode = resolve
        })
      })
    }))
  }
})

describe('VideoContainer Conversion', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      blob: () => Promise.resolve(new Blob(['video content'], { type: 'video/quicktime' }))
    })
    resolveTranscode = null
  })

  it('shows loading state while converting', async () => {
    const src = 'video.mov'
    
    // Renderiza e dispara efeito
    render(<VideoContainer src={src} shouldConvert={true} />)
    
    // Verifica loading inicial
    expect(await screen.findByText(/convertendo/i)).toBeInTheDocument()

    // Resolve para evitar efeitos colaterais
    if (resolveTranscode) await act(async () => resolveTranscode('blob:done'))
  })

  it('renders converted video after processing', async () => {
    const src = 'video.mov'
    render(<VideoContainer src={src} shouldConvert={true} />)
    
    // Espera o mock capturar a função resolve
    await waitFor(() => expect(resolveTranscode).toBeDefined())
    
    // Resolve a conversão
    await act(async () => {
      resolveTranscode('blob:transcoded-video')
    })
    
    // Aguarda o componente sair do loading e renderizar o vídeo
    await waitFor(() => {
      const video = screen.getByTestId('main-video')
      expect(video).toHaveAttribute('src', 'blob:transcoded-video')
    })
  })
})
