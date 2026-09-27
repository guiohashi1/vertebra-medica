import { useFrame, useThree } from '@react-three/fiber'
import { useRef, type ReactNode } from 'react'
import type { Group } from 'three'

type SwapInProps = {
  children: ReactNode
  animate?: boolean
  /** Rotação extra (rad) conforme a rolagem da página. Só usada quando definida. */
  scrollSpin?: number
}

const DURATION = 1.1

/**
 * Entrada do modelo: sobe, cresce e gira até a posição final.
 * Chama invalidate() para funcionar também com frameloop="demand".
 */
export function SwapIn({ children, animate = true, scrollSpin }: SwapInProps) {
  const ref = useRef<Group>(null)
  const progress = useRef(animate ? 0 : 1)
  const invalidate = useThree((s) => s.invalidate)

  useFrame((_, delta) => {
    const group = ref.current
    if (!group) return

    const spin =
      scrollSpin != null
        ? -Math.min(window.scrollY / window.innerHeight, 1.2) * scrollSpin
        : 0

    if (progress.current < 1) {
      progress.current = Math.min(1, progress.current + Math.min(delta, 1 / 30) / DURATION)
      const t = 1 - Math.pow(1 - progress.current, 3)
      group.scale.setScalar(0.8 + 0.2 * t)
      group.position.y = (1 - t) * -0.35
      group.rotation.y = (1 - t) * -1.1 + spin
      invalidate()
      return
    }

    group.rotation.y = spin
  })

  return (
    <group
      ref={ref}
      scale={animate ? 0.8 : 1}
      position={[0, animate ? -0.35 : 0, 0]}
      rotation={[0, animate ? -1.1 : 0, 0]}
    >
      {children}
    </group>
  )
}
