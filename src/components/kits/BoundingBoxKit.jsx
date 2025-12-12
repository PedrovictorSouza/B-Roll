import { useEffect } from 'react'
import { useDebug } from '../../contexts/DebugContext'

export function BoundingBoxKit() {
  const { isDebugMode } = useDebug()

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
        outline: 1px solid rgba(255, 0, 0, 0.2) !important;
      }
      *:hover {
        outline: 2px solid red !important;
      }
      /* Exibe classes ao hover */
      *:hover::after {
        content: attr(class);
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.8);
        color: #fff;
        padding: 2px 4px;
        font-size: 10px;
        z-index: 99999;
        white-space: nowrap;
        pointer-events: none;
      }
    `

    return () => {
      // Limpeza apenas quando o componente desmontar ou debugMode desligar
      if (styleElement) {
         styleElement.remove()
      }
    }
  }, [isDebugMode])

  // Se debugMode for false, garante limpeza imediata no re-render
  // O useEffect cleanup roda antes do novo efeito, mas se isDebugMode for false, 
  // o novo efeito não cria nada. No entanto, se mudou de true para false, 
  // o cleanup do efeito anterior (onde isDebugMode era true) vai rodar e remover o estilo.
  // Isso está correto.

  return (
    <div data-testid="bounding-box-kit" style={{ display: 'none' }} />
  )
}
