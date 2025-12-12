import './App.css'
import { BoundingBoxKit } from './components/kits/BoundingBoxKit'
import { CoordinateGridKit } from './components/kits/CoordinateGridKit'
import { DebugKit } from './components/kits/DebugKit'
import { DebugProvider } from './contexts/DebugContext'
import { MediaControls } from './features/editor/ui/MediaControls'
import { VideoContainer } from './features/editor/ui/VideoContainer'
import { useMediaPlayer } from './features/editor/application/useMediaPlayer'
import { VideoTimeline } from './features/editor/domain/VideoTimeline'
import video1 from './assets/videos/video1.mov'

function App() {
  const { 
    videoRef, 
    isPlaying, 
    currentTime, 
    duration, 
    togglePlay, 
    stop, 
    videoEvents 
  } = useMediaPlayer()

  const timeline = new VideoTimeline({ duration })
  timeline.updateProgress(currentTime)

  return (
    <DebugProvider>
      <main className="layout-container">
        <aside className="sidebar-left">
          {/* Ferramentas */}
          <div style={{ padding: '1rem' }}>Ferramentas</div>
        </aside>
        <section className="content-right">
          <div className="video-area">
            {/* Vídeo */}
            <VideoContainer 
              src={video1} 
              videoRef={videoRef}
              events={videoEvents}
            />
            <BoundingBoxKit />
            <CoordinateGridKit />
          </div>
          <div className="edition-panel">
            {/* Painel */}
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ marginBottom: 'auto' }}>Painel de Edição</div>
              
              {/* Media Controls Integrados */}
              <div style={{ marginTop: '20px' }}>
                <MediaControls 
                  percentage={timeline.percentage} 
                  isPlaying={isPlaying} 
                  onPlayPause={togglePlay} 
                  onStop={stop} 
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
