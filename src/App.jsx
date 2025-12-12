import './App.css'

function App() {
  return (
    <main className="layout-container">
      <aside className="sidebar-left">
        {/* Ferramentas */}
        <div style={{ padding: '1rem' }}>Ferramentas</div>
      </aside>
      <section className="content-right">
        <div className="video-area">
          {/* Vídeo */}
          <div style={{ color: '#666' }}>Vídeo Widescreen</div>
        </div>
        <div className="edition-panel">
          {/* Painel */}
          <div style={{ padding: '1rem' }}>Painel de Edição</div>
        </div>
      </section>
    </main>
  )
}

export default App
