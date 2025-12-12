import { describe, it, expect } from 'vitest'
import { formatTime } from './timeUtils'

describe('Time Formatting Utils', () => {
  it('formats seconds to MM:SS', () => {
    expect(formatTime(0)).toBe('00:00')
    expect(formatTime(9)).toBe('00:09')
    expect(formatTime(60)).toBe('01:00')
    expect(formatTime(65)).toBe('01:05')
    expect(formatTime(3599)).toBe('59:59') // Limite simples
  })

  it('handles rounding correctly', () => {
    expect(formatTime(10.1)).toBe('00:10')
    expect(formatTime(10.9)).toBe('00:10') // Floor ou round? Geralmente floor para player.
  })
})

