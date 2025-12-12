import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BoundingBoxKit } from './BoundingBoxKit'
import { CoordinateGridKit } from './CoordinateGridKit'
import { DebugKit } from './DebugKit'
import { DebugProvider } from '../../contexts/DebugContext'

// Helper para renderizar com Provider
const renderWithProvider = (ui) => {
  return render(
    <DebugProvider>
      {ui}
    </DebugProvider>
  )
}

describe('Kits', () => {
  it('BoundingBoxKit renders correctly', () => {
    renderWithProvider(<BoundingBoxKit />)
    expect(screen.getByTestId('bounding-box-kit')).toBeInTheDocument()
  })

  it('CoordinateGridKit renders correctly', () => {
    renderWithProvider(<CoordinateGridKit />)
    expect(screen.getByTestId('coordinate-grid-kit')).toBeInTheDocument()
  })

  it('DebugKit renders correctly', () => {
    renderWithProvider(<DebugKit />)
    expect(screen.getByTestId('debug-kit')).toBeInTheDocument()
  })
})
