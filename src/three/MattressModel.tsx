import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Mesh } from 'three'

type MattressModelProps = {
  animated?: boolean
}

export function MattressModel({ animated = true }: MattressModelProps) {
  const mesh = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (!animated || !mesh.current) return
    const t = clock.getElapsedTime()
    mesh.current.position.y = Math.sin(t * 0.8) * 0.03
    mesh.current.rotation.y = Math.sin(t * 0.2) * 0.08
  })

  return (
    <group position={[0, -0.15, 0]}>
      {/* Cover / top */}
      <mesh ref={mesh} castShadow receiveShadow>
        <boxGeometry args={[1.85, 0.28, 0.95]} />
        <meshStandardMaterial color="#f1f3f5" roughness={0.88} metalness={0} />
      </mesh>

      {/* Side band */}
      <mesh position={[0, -0.02, 0]} castShadow>
        <boxGeometry args={[1.86, 0.12, 0.96]} />
        <meshStandardMaterial color="#c5d0ce" roughness={0.75} metalness={0.05} />
      </mesh>

      {/* Foam core hint (slightly inset) */}
      <mesh position={[0, -0.12, 0]}>
        <boxGeometry args={[1.7, 0.1, 0.82]} />
        <meshStandardMaterial color="#dfe8e6" roughness={0.95} metalness={0} />
      </mesh>

      {/* Seam lines as thin ridges */}
      {[-0.35, 0, 0.35].map((x) => (
        <mesh key={x} position={[x, 0.145, 0]}>
          <boxGeometry args={[0.012, 0.01, 0.88]} />
          <meshStandardMaterial color="#d4d9de" roughness={0.9} metalness={0} />
        </mesh>
      ))}
    </group>
  )
}
