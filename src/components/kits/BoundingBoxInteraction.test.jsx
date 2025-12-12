import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BoundingBoxKit } from './BoundingBoxKit'
import { DebugProvider, useDebug } from '../../contexts/DebugContext'
import { useEffect } from 'react'

const DebugActivator = ({ children }) => {
  const { toggleDebugMode, isDebugMode } = useDebug()
  useEffect(() => {
    if (!isDebugMode) toggleDebugMode()
  }, [])
  
  if (!isDebugMode) return null
  return children
}

const renderWithProvider = (ui) => {
  return render(
    <DebugProvider>
      <DebugActivator>
        {ui}
      </DebugActivator>
    </DebugProvider>
  )
}

describe('BoundingBoxKit Interaction', () => {
  it('displays class name in tooltip on hover', async () => {
    renderWithProvider(
      <div>
        <BoundingBoxKit />
        <div data-testid="target" className="test-target-class">Target</div>
      </div>
    )

    const target = await screen.findByTestId('target')
    fireEvent.mouseOver(target)
    
    // Agora esperamos tag + classe + dimensões
    // O rect padrão em jsdom geralmente é 0x0, então pode ser (0x0)
    // Vamos usar regex para ser flexível com as dimensões
    expect(await screen.findByText(/div\.test-target-class/)).toBeInTheDocument()
  })

  it('displays tag name for elements without class', async () => {
    renderWithProvider(
      <div>
        <BoundingBoxKit />
        <span data-testid="target-no-class">Target No Class</span>
      </div>
    )

    const target = await screen.findByTestId('target-no-class')
    fireEvent.mouseOver(target)

    // Espera ver apenas "span" e dimensões
    expect(await screen.findByText(/span \(/)).toBeInTheDocument()
  })
})
