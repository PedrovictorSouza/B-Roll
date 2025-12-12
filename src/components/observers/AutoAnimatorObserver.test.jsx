import { render } from '@testing-library/react'
import { describe, it } from 'vitest'
import AutoAnimatorObserver from './AutoAnimatorObserver'

describe('AutoAnimatorObserver', () => {
  it('renders without crashing', () => {
    render(<AutoAnimatorObserver />)
  })
})
