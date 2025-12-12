import './App.css'
import { BoundingBoxKit } from './components/kits/BoundingBoxKit'
import { CoordinateGridKit } from './components/kits/CoordinateGridKit'
import { DebugKit } from './components/kits/DebugKit'
import { DebugProvider } from './contexts/DebugContext'
import { MediaControls } from './features/editor/ui/MediaControls'
import widescreenVideo from './assets/videos/widescreen-preview.mp4'

function App() {
  return (
    <DebugProvider>
      <main className="layout-container">
        <aside className="sidebar-left">
          {/* Ferramentas */}
          <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>Ferramentas</div>
            <button
              data-testid="add-intervention"
              type="button"
              style={{
                background: '#4a90e2',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '0.5rem 1rem',
                cursor: 'pointer'
              }}
            >
              Adicionar intervenção
            </button>
          </div>
        </aside>
        <section className="content-right">
          <div className="video-area">
            <div className="video-stage">
              <video
                data-testid="widescreen-video"
                src={widescreenVideo}
                preload="metadata"
                controls
                playsInline
                onLoadedData={(event) => event.currentTarget.pause()}
              >
                <source src={widescreenVideo} type="video/mp4" />
                Seu navegador não suporta vídeos HTML5.
              </video>
              <CoordinateGridKit />
            </div>
            <BoundingBoxKit />
          </div>
          <div className="edition-panel">
            {/* Painel */}
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ marginBottom: 'auto' }}>Painel de Edição</div>
              
              {/* Media Controls Integrados */}
              <div style={{ marginTop: '20px' }}>
                <MediaControls 
                  percentage={30} 
                  isPlaying={false} 
                  onPlayPause={() => console.log('Toggle Play')} 
                  onStop={() => console.log('Stop')} 
                />
              </div>
            </div>
          </div>
        </section>
        <DebugKit />
      </main>
    </DebugProvider>
  )
}

export default App
