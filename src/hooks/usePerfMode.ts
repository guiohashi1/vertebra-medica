import { useEffect, useState } from 'react'

export type PerfMode = 'full' | 'lite' | 'static'

function isSoftwareRenderer(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true }) ||
      canvas.getContext('experimental-webgl', {
        failIfMajorPerformanceCaveat: true,
      })

    if (!gl) return true

    const debugInfo = (gl as WebGLRenderingContext).getExtension(
      'WEBGL_debug_renderer_info',
    )
    if (debugInfo) {
      const renderer = String(
        (gl as WebGLRenderingContext).getParameter(
          debugInfo.UNMASKED_RENDERER_WEBGL,
        ),
      )
      if (
        /swiftshader|llvmpipe|softpipe|microsoft basic render|gdi generic/i.test(
          renderer,
        )
      ) {
        return true
      }
    }

    return false
  } catch {
    return true
  }
}

export function detectPerfMode(): PerfMode {
  if (typeof window === 'undefined') return 'full'

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 'static'
  }

  const nav = navigator as Navigator & {
    deviceMemory?: number
    connection?: { saveData?: boolean }
  }

  if (nav.connection?.saveData) return 'static'
  if (isSoftwareRenderer()) return 'static'

  const cores = nav.hardwareConcurrency || 8
  const memory = nav.deviceMemory

  if (cores <= 2 || (memory != null && memory <= 2)) return 'static'
  if (cores <= 4 || (memory != null && memory <= 4)) return 'lite'

  return 'full'
}

export function usePerfMode() {
  const [mode, setMode] = useState<PerfMode>('full')

  useEffect(() => {
    const next = detectPerfMode()
    setMode(next)
    document.documentElement.dataset.perf = next
  }, [])

  return mode
}
