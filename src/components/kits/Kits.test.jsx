import { render } from '@testing-library/react'
import { describe, it } from 'vitest'
import { BoundingBoxKit } from './BoundingBoxKit'
import { CoordinateGridKit } from './CoordinateGridKit'
import { DebugKit } from './DebugKit'

describe('Kits', () => {
  it('BoundingBoxKit renders without crashing', () => {
    render(<BoundingBoxKit />)
  })

  it('CoordinateGridKit renders without crashing', () => {
    render(<CoordinateGridKit />)
  })

  it('DebugKit renders without crashing', () => {
    render(<DebugKit />)
  })
})
