export function CoordinateGridKit() {
  return (
    <div 
      data-testid="coordinate-grid-kit"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'linear-gradient(to right, #ccc 1px, transparent 1px), linear-gradient(to bottom, #ccc 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        opacity: 0.5,
        pointerEvents: 'none',
        zIndex: 9998
      }}
    >
      Coordinate Grid Kit
    </div>
  )
}

