import { describe, it, expect } from 'vitest'

// Interface (simulada via classe abstrata/base já que é JS)
class VideoTranscoderService {
  async transcode(file) {
    throw new Error('Method not implemented')
  }
}

describe('VideoTranscoderService Interface', () => {
  it('should be defined', () => {
    expect(VideoTranscoderService).toBeDefined()
  })

  it('should throw if method not implemented', async () => {
    const service = new VideoTranscoderService()
    await expect(service.transcode(new Blob())).rejects.toThrow('Method not implemented')
  })
})

