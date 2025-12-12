import { render } from '@testing-library/react'
import App from './App'
import { describe, it, expect } from 'vitest'

describe('App Layout', () => {
  it('renders the main layout structure', () => {
    const { container } = render(<App />)
    
    // Verifica container principal
    const main = container.querySelector('.layout-container')
    expect(main).toBeInTheDocument()
    
    // Verifica Sidebar
    const sidebar = container.querySelector('.sidebar-left')
    expect(sidebar).toBeInTheDocument()
    
    // Verifica Content Right
    const contentRight = container.querySelector('.content-right')
    expect(contentRight).toBeInTheDocument()
    
    // Verifica Áreas Internas
    const videoArea = container.querySelector('.video-area')
    const editionPanel = container.querySelector('.edition-panel')
    
    expect(videoArea).toBeInTheDocument()
    expect(editionPanel).toBeInTheDocument()
  })

  it('layout container has correct grid class', () => {
    const { container } = render(<App />)
    const main = container.querySelector('.layout-container')
    expect(main).toHaveClass('layout-container')
  })
})
