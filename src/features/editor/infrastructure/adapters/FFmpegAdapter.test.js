import { describe, it, expect, vi } from 'vitest'
import { FFmpegAdapter } from './FFmpegAdapter'

// Mock do FFmpeg
vi.mock('@ffmpeg/ffmpeg', () => {
  return {
    FFmpeg: vi.fn().mockImplementation(() => ({
      loaded: false,
      load: vi.fn().mockResolvedValue(),
      writeFile: vi.fn().mockResolvedValue(),
      readFile: vi.fn().mockResolvedValue(new Uint8Array([0, 0, 0])), // Mock blob data
      exec: vi.fn().mockResolvedValue(),
      terminate: vi.fn()
    }))
  }
})

vi.mock('@ffmpeg/util', () => {
  return {
    fetchFile: vi.fn().mockResolvedValue(new Uint8Array([]))
  }
})

describe('FFmpegAdapter', () => {
  it('should implement transcode method', () => {
    const adapter = new FFmpegAdapter()
    expect(adapter.transcode).toBeDefined()
  })

  it('should call ffmpeg methods to process video', async () => {
    const adapter = new FFmpegAdapter()
    const mockFile = new File([''], 'test.mov', { type: 'video/quicktime' })
    
    // Como URL.createObjectURL não existe em jsdom/node por padrão sem configuração extra ou polyfill no vitest setup,
    // vamos mockar globalmente apenas para este teste ou assumir que o adapter retorna string.
    global.URL.createObjectURL = vi.fn(() => 'blob:test')

    const result = await adapter.transcode(mockFile)
    
    expect(result).toBe('blob:test')
  })
})

