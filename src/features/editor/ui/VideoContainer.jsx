import { useState, useEffect } from 'react'
import { FFmpegAdapter } from '../infrastructure/adapters/FFmpegAdapter'

export function VideoContainer({ src, videoRef, events = {}, shouldConvert = false }) {
  const [hasError, setHasError] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [convertedSrc, setConvertedSrc] = useState(null)
  
  const currentSrc = convertedSrc || src

  useEffect(() => {
    // Lógica simplificada para detectar necessidade de conversão
    // Na prática, checaríamos extensão ou cabeçalho
    // Aqui usamos a prop 'shouldConvert' ou extensão .mov
    const needsConversion = shouldConvert || (typeof src === 'string' && src.toLowerCase().endsWith('.mov'))

    if (needsConversion && !convertedSrc) {
      const convert = async () => {
        try {
          setIsConverting(true)
          const adapter = new FFmpegAdapter()
          
          // Precisamos buscar o arquivo se for URL
          let fileToConvert = src
          if (typeof src === 'string') {
            const response = await fetch(src)
            const blob = await response.blob()
            fileToConvert = new File([blob], 'video.mov', { type: 'video/quicktime' })
          }

          const newSrc = await adapter.transcode(fileToConvert)
          setConvertedSrc(newSrc)
        } catch (error) {
          console.error('Conversion failed', error)
          setHasError(true)
        } finally {
          setIsConverting(false)
        }
      }

      convert()
    }
  }, [src, shouldConvert, convertedSrc])

  const handleError = () => {
    // Se falhar e for MOV, tenta converter se ainda não tentou?
    // Por enquanto, mostra erro se não for processo de conversão
    if (!isConverting) {
      setHasError(true)
    }
  }

  if (isConverting) {
    return (
      <div 
        className="video-container" 
        style={{ 
          width: '100%', 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#000',
          color: '#fff'
        }}
      >
        <span>Convertendo vídeo... (Isso pode demorar)</span>
      </div>
    )
  }

  return (
    <div className="video-container" style={{ width: '100%', height: '100%', position: 'relative' }}>
      {hasError ? (
        <div 
          style={{ 
            color: 'white', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            backgroundColor: '#000',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <span>⚠️ Formato de vídeo não suportado</span>
          <span style={{ fontSize: '0.8em', color: '#999' }}>Tente converter para MP4</span>
        </div>
      ) : (
        <video
          ref={videoRef}
          data-testid="main-video"
          src={currentSrc}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          onError={handleError}
          controls={false}
          playsInline
          {...events}
        />
      )}
    </div>
  )
}
