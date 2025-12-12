import { useState, useEffect } from 'react'
// Adapters removidos pois agora assumimos MP4 nativo

export function VideoContainer({ src, videoRef, events = {}, shouldConvert = false }) {
  const [hasError, setHasError] = useState(false)
  
  // Simplificação: VideoContainer agora foca apenas em reproduzir
  // Se futuramente precisarmos de conversão, reintroduzimos o Adapter via injeção de dependência
  // para não acoplar a UI com infraestrutura pesada (ffmpeg).

  const handleError = () => {
    setHasError(true)
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
          <span>⚠️ Erro ao carregar vídeo</span>
          <span style={{ fontSize: '0.8em', color: '#999' }}>Verifique o formato ou o caminho do arquivo</span>
        </div>
      ) : (
        <video
          ref={videoRef}
          data-testid="main-video"
          src={src}
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
