import { ProgressBar } from './ProgressBar'

export function MediaControls({ percentage, isPlaying, onPlayPause, onStop }) {
  return (
    <div className="media-controls" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Barra de Progresso no topo */}
      <ProgressBar percentage={percentage} />
      
      {/* Controles abaixo */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button 
          onClick={onPlayPause}
          style={{ 
            cursor: 'pointer', 
            padding: '5px 15px',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '4px'
          }}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        
        <button 
          onClick={onStop}
          style={{ 
            cursor: 'pointer', 
            padding: '5px 15px',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '4px'
          }}
          aria-label="Stop"
        >
          Stop
        </button>
      </div>
    </div>
  )
}

