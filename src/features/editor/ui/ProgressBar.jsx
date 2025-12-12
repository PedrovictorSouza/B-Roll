export function ProgressBar({ percentage }) {
  return (
    <div 
      role="progressbar" 
      aria-valuenow={percentage}
      aria-valuemin="0"
      aria-valuemax="100"
      style={{
        width: '100%',
        height: '8px',
        backgroundColor: '#333',
        borderRadius: '4px',
        overflow: 'hidden'
      }}
    >
      <div 
        data-testid="progress-fill"
        style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: '#4a90e2',
          transition: 'width 0.1s ease-in-out'
        }}
      />
    </div>
  )
}

