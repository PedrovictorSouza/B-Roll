export function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '00:00'
  
  const totalSeconds = Math.floor(seconds)
  const minutes = Math.floor(totalSeconds / 60)
  const remainingSeconds = totalSeconds % 60
  
  const paddedMinutes = String(minutes).padStart(2, '0')
  const paddedSeconds = String(remainingSeconds).padStart(2, '0')
  
  return `${paddedMinutes}:${paddedSeconds}`
}

