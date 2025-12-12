import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import { VideoTranscoderService } from '../../domain/VideoTranscoderService'

export class FFmpegAdapter extends VideoTranscoderService {
  constructor() {
    super()
    this.ffmpeg = new FFmpeg()
  }

  async transcode(file) {
    if (!this.ffmpeg.loaded) {
      await this.ffmpeg.load()
    }

    const inputName = 'input.mov'
    const outputName = 'output.mp4'

    await this.ffmpeg.writeFile(inputName, await fetchFile(file))

    // Executa comando ffmpeg para converter para MP4 (h264)
    // -i input -c:v libx264 -preset fast -crf 22 -c:a aac -b:a 128k output.mp4
    // Simplificado para teste: -i input output.mp4
    await this.ffmpeg.exec(['-i', inputName, outputName])

    const data = await this.ffmpeg.readFile(outputName)
    
    return URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }))
  }
}

