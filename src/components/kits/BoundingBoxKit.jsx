import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useDebug } from '../../contexts/DebugContext'

export function BoundingBoxKit() {
  const { isDebugMode } = useDebug()
  const [hoverInfo, setHoverInfo] = useState(null)

  useEffect(() => {
    if (!isDebugMode) return

    const styleId = 'debug-bounding-box-style'
    let styleElement = document.getElementById(styleId)

    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }

    styleElement.innerHTML = `
      * {
        outline: 1px solid rgba(255, 0, 0, 0.5) !important;
      }
      *:hover {
        outline: 2px solid red !important;
        background-color: rgba(255, 0, 0, 0.05) !important;
      }
    `

    const handleMouseOver = (e) => {
      const target = e.target
      
      // Ignora o próprio tooltip
      if (target.getAttribute('data-debug-tooltip')) return

      const rect = target.getBoundingClientRect()
      
      const tagName = target.tagName.toLowerCase()
      const className = target.className && typeof target.className === 'string' ? `.${target.className.split(' ').join('.')}` : ''
      const dimensions = `(${Math.round(rect.width)}x${Math.round(rect.height)})`
      
      setHoverInfo({
        text: `${tagName}${className} ${dimensions}`,
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      })
    }

    const handleMouseOut = () => {
      setHoverInfo(null)
    }

    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      if (styleElement) styleElement.remove()
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [isDebugMode])

  if (!isDebugMode) return <div data-testid="bounding-box-kit" style={{ display: 'none' }} />

  return (
    <>
      <div data-testid="bounding-box-kit" style={{ display: 'none' }} />
      {hoverInfo && createPortal(
        <div 
          data-debug-tooltip
          style={{
            position: 'fixed',
            // Posiciona no canto superior esquerdo INTERNO do elemento
            // Adicionamos um pequeno padding (2px) para não colar na borda exata
            top: hoverInfo.y + 2, 
            left: hoverInfo.x + 2,
            background: 'rgba(0,0,0,0.9)',
            color: '#fff',
            padding: '2px 6px',
            fontSize: '10px',
            zIndex: 99999,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            borderRadius: '0 0 3px 0', // Canto arredondado apenas na ponta oposta para estilo
            fontFamily: 'monospace',
            maxWidth: hoverInfo.width - 4, // Evita vazar horizontalmente se o elemento for pequeno
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {hoverInfo.text}
        </div>,
        document.body
      )}
    </>
  )
}
