import { useDebug } from '../../contexts/DebugContext'

export function DebugKit() {
  const { isDebugMode, toggleDebugMode } = useDebug()

  return (
    <div 
      data-testid="debug-kit"
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 10000,
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
      }}
    >
      <span>Debug: {isDebugMode ? 'ON' : 'OFF'}</span>
      <button 
        onClick={toggleDebugMode} 
        style={{ cursor: 'pointer', padding: '2px 5px' }}
      >
        Toggle Debug
      </button>
    </div>
  )
}
