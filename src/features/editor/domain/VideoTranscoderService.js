export class VideoTranscoderService {
  /**
   * Converte um arquivo de vídeo para um formato compatível com o navegador (MP4/H.264).
   * @param {File|Blob} file - O arquivo de vídeo original.
   * @returns {Promise<string>} - A URL do objeto (blob URL) do vídeo convertido.
   */
  async transcode(file) {
    throw new Error('Method not implemented')
  }
}

