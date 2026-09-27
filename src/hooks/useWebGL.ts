import { useEffect, useState } from 'react'

export function useWebGL() {
  const [ok, setOk] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setOk(!!gl)
    } catch {
      setOk(false)
    }
  }, [])

  return ok
}
