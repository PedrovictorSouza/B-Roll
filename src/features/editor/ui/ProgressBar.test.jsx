import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProgressBar } from './ProgressBar'

describe('ProgressBar UI', () => {
  it('renders correctly', () => {
    render(<ProgressBar percentage={0} />)
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
  })

  it('displays correct width based on percentage', () => {
    render(<ProgressBar percentage={50} />)
    const progressFill = screen.getByTestId('progress-fill')
    expect(progressFill).toHaveStyle({ width: '50%' })
  })

  it('has correct aria attributes', () => {
    render(<ProgressBar percentage={75} />)
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '75')
    expect(progressBar).toHaveAttribute('aria-valuemin', '0')
    expect(progressBar).toHaveAttribute('aria-valuemax', '100')
  })
})

