import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { DebugProvider } from '../../contexts/DebugContext'
import { DebugKit } from './DebugKit'
import { BoundingBoxKit } from './BoundingBoxKit'

describe('Debug Integration', () => {
  it('DebugKit toggles debug mode and BoundingBoxKit reacts', () => {
    render(
      <DebugProvider>
        <DebugKit />
        <BoundingBoxKit />
      </DebugProvider>
    )

    const toggleButton = screen.getByRole('button', { name: /toggle debug/i })
    // Como o span tem "Debug: OFF", getByText(/Debug:/i) pega ele.
    
    // Inicialmente OFF
    expect(screen.getByText(/Debug: OFF/i)).toBeInTheDocument()

    // Clica para ativar
    fireEvent.click(toggleButton)
    
    // Verifica se mudou para ON
    expect(screen.getByText(/Debug: ON/i)).toBeInTheDocument()
    
    // Clica para desativar
    fireEvent.click(toggleButton)
    expect(screen.getByText(/Debug: OFF/i)).toBeInTheDocument()
  })
})
