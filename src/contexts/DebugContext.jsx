import { createContext, useState, useContext } from 'react'

const DebugContext = createContext()

export function DebugProvider({ children }) {
  const [isDebugMode, setIsDebugMode] = useState(false)

  const toggleDebugMode = () => {
    setIsDebugMode(prev => !prev)
  }

  return (
    <DebugContext.Provider value={{ isDebugMode, toggleDebugMode }}>
      {children}
    </DebugContext.Provider>
  )
}

export function useDebug() {
  const context = useContext(DebugContext)
  if (!context) {
    throw new Error('useDebug must be used within a DebugProvider')
  }
  return context
}

