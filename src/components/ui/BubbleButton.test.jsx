import { render } from '@testing-library/react'
import { describe, it } from 'vitest'
import BubbleButton from './BubbleButton'

describe('BubbleButton', () => {
  it('renders without crashing', () => {
    render(<BubbleButton />)
  })
})
