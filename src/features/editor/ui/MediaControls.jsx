import { ProgressBar } from './ProgressBar'
import { formatTime } from '../domain/timeUtils'

const BUTTON_STYLE = {
  cursor: 'pointer',
  padding: '5px 15px',
  backgroundColor: '#333',
  color: '#fff',
  border: 'none',
  borderRadius: '4px'
}

export function MediaControls({ percentage, isPlaying, onPlayPause, onStop, currentTime = 0, duration = 0 }) {
  return (
    <div className="media-controls" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Barra de Progresso no topo */}
      <ProgressBar percentage={percentage} />
      
      {/* Controles abaixo */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button 
          onClick={onPlayPause}
          style={BUTTON_STYLE}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        
        <button 
          onClick={onStop}
          style={BUTTON_STYLE}
          aria-label="Stop"
        >
          Stop
        </button>

        <div 
          style={{ 
            color: '#aaa', 
            fontSize: '12px', 
            fontFamily: 'monospace',
            marginLeft: 'auto' // Empurra para a direita se container tiver width fixo ou flex-grow
          }}
        >
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  )
}
