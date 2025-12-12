import { render } from '@testing-library/react'
import { describe, it } from 'vitest'
import IntroController from './IntroController'
import ScrollRevealController from './ScrollRevealController'

describe('Controllers', () => {
  it('IntroController renders without crashing', () => {
    render(<IntroController />)
  })

  it('ScrollRevealController renders without crashing', () => {
    render(<ScrollRevealController />)
  })
})
