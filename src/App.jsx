import './App.css'
import { BoundingBoxKit } from './components/kits/BoundingBoxKit'
import { CoordinateGridKit } from './components/kits/CoordinateGridKit'
import { DebugKit } from './components/kits/DebugKit'
import { DebugProvider } from './contexts/DebugContext'

function App() {
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
            <div style={{ color: '#666' }}>Vídeo Widescreen</div>
            <BoundingBoxKit />
            <CoordinateGridKit />
          </div>
          <div className="edition-panel">
            {/* Painel */}
            <div style={{ padding: '1rem' }}>Painel de Edição</div>
          </div>
        </section>
        <DebugKit />
      </main>
    </DebugProvider>
  )
}

export default App
