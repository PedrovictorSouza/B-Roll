import { describe, it, expect } from 'vitest'
import { VideoTimeline } from './VideoTimeline'

describe('VideoTimeline Entity', () => {
  it('should initialize with 0 progress and default duration', () => {
    const timeline = new VideoTimeline({ duration: 100 })
    expect(timeline.progress).toBe(0)
    expect(timeline.duration).toBe(100)
  })

  it('should update progress correctly', () => {
    const timeline = new VideoTimeline({ duration: 100 })
    timeline.updateProgress(50)
    expect(timeline.progress).toBe(50)
  })

  it('should calculate percentage correctly', () => {
    const timeline = new VideoTimeline({ duration: 200 })
    timeline.updateProgress(100)
    expect(timeline.percentage).toBe(50)
  })

  it('should not allow progress less than 0', () => {
    const timeline = new VideoTimeline({ duration: 100 })
    timeline.updateProgress(-10)
    expect(timeline.progress).toBe(0)
  })

  it('should not allow progress greater than duration', () => {
    const timeline = new VideoTimeline({ duration: 100 })
    timeline.updateProgress(150)
    expect(timeline.progress).toBe(100)
  })
})

