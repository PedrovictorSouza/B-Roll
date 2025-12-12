import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { DebugProvider, useDebug } from './DebugContext'
import { useEffect } from 'react'

// Componente de teste para consumir o contexto
const TestComponent = () => {
  const { isDebugMode, toggleDebugMode } = useDebug()
  return (
    <div>
      <span data-testid="status">{isDebugMode ? 'ON' : 'OFF'}</span>
      <button onClick={toggleDebugMode}>Toggle</button>
    </div>
  )
}

describe('DebugContext', () => {
  it('provides initial state as false', () => {
    render(
      <DebugProvider>
        <TestComponent />
      </DebugProvider>
    )
    expect(screen.getByTestId('status')).toHaveTextContent('OFF')
  })

  it('toggles state when function is called', () => {
    render(
      <DebugProvider>
        <TestComponent />
      </DebugProvider>
    )
    
    const button = screen.getByText('Toggle')
    fireEvent.click(button)
    expect(screen.getByTestId('status')).toHaveTextContent('ON')
    
    fireEvent.click(button)
    expect(screen.getByTestId('status')).toHaveTextContent('OFF')
  })
})

