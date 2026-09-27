import { createContext, useContext, type ReactNode } from 'react'
import { usePerfMode, type PerfMode } from '../hooks/usePerfMode'

const PerfContext = createContext<PerfMode>('full')

export function PerfProvider({ children }: { children: ReactNode }) {
  const mode = usePerfMode()
  return <PerfContext.Provider value={mode}>{children}</PerfContext.Provider>
}

export function usePerf() {
  return useContext(PerfContext)
}
