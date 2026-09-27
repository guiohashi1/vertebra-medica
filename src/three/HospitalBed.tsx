import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Group } from 'three'

const metal = '#6d7680'
const metalDark = '#4a525a'
const plastic = '#d8dde2'
const rail = '#8a939c'
const mattress = '#eef1f3'
const mattressSide = '#d5dbe0'
const wheel = '#2a2e33'
const accent = '#3a5552'

type BedProps = {
  variant: 'eletrica' | 'manual'
  animated?: boolean
  position?: [number, number, number]
}

export function HospitalBed({
  variant,
  animated = true,
  position = [0, -0.35, 0],
}: BedProps) {
  const group = useRef<Group>(null)
  const head = useRef<Group>(null)
  const isElectric = variant === 'eletrica'

  const materials = useMemo(
    () => ({
      frame: { color: metal, roughness: 0.45, metalness: 0.55 },
      dark: { color: metalDark, roughness: 0.4, metalness: 0.6 },
      plastic: { color: plastic, roughness: 0.7, metalness: 0.05 },
      rail: { color: rail, roughness: 0.35, metalness: 0.65 },
      mattress: { color: mattress, roughness: 0.85, metalness: 0 },
      mattressSide: { color: mattressSide, roughness: 0.8, metalness: 0 },
      wheel: { color: wheel, roughness: 0.9, metalness: 0.1 },
      accent: { color: accent, roughness: 0.5, metalness: 0.2 },
    }),
    [],
  )

  useFrame(({ clock }) => {
    if (!animated || !head.current) return
    const t = clock.getElapsedTime()
    const angle = isElectric
      ? 0.18 + Math.sin(t * 0.45) * 0.12
      : 0.12 + Math.sin(t * 0.25) * 0.05
    head.current.rotation.x = -angle
  })

  return (
    <group ref={group} position={position} scale={1.05}>
      {/* Base / chassis */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.06, 0.78]} />
        <meshStandardMaterial {...materials.frame} />
      </mesh>

      {/* Legs */}
      {[
        [-0.72, 0.02, 0.28],
        [0.72, 0.02, 0.28],
        [-0.72, 0.02, -0.28],
        [0.72, 0.02, -0.28],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh castShadow>
            <boxGeometry args={[0.06, 0.28, 0.06]} />
            <meshStandardMaterial {...materials.dark} />
          </mesh>
          <mesh position={[0, -0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.04, 16]} />
            <meshStandardMaterial {...materials.wheel} />
          </mesh>
        </group>
      ))}

      {/* Side rails */}
      {[-0.42, 0.42].map((z, i) => (
        <group key={`rail-${i}`} position={[0.05, 0.42, z]}>
          <mesh castShadow>
            <boxGeometry args={[1.15, 0.04, 0.035]} />
            <meshStandardMaterial {...materials.rail} />
          </mesh>
          <mesh position={[-0.5, -0.12, 0]} castShadow>
            <boxGeometry args={[0.03, 0.22, 0.03]} />
            <meshStandardMaterial {...materials.rail} />
          </mesh>
          <mesh position={[0.5, -0.12, 0]} castShadow>
            <boxGeometry args={[0.03, 0.22, 0.03]} />
            <meshStandardMaterial {...materials.rail} />
          </mesh>
        </group>
      ))}

      {/* Footboard */}
      <mesh position={[0.82, 0.48, 0]} castShadow>
        <boxGeometry args={[0.05, 0.42, 0.72]} />
        <meshStandardMaterial {...materials.plastic} />
      </mesh>

      {/* Headboard */}
      <mesh position={[-0.82, 0.55, 0]} castShadow>
        <boxGeometry args={[0.06, 0.55, 0.72]} />
        <meshStandardMaterial {...materials.plastic} />
      </mesh>

      {/* Mattress base (foot / middle) */}
      <mesh position={[0.22, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.05, 0.1, 0.68]} />
        <meshStandardMaterial {...materials.mattress} />
      </mesh>
      <mesh position={[0.22, 0.24, 0]}>
        <boxGeometry args={[1.05, 0.04, 0.68]} />
        <meshStandardMaterial {...materials.mattressSide} />
      </mesh>

      {/* Articulated head section */}
      <group ref={head} position={[-0.35, 0.3, 0]}>
        <mesh position={[-0.28, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.55, 0.1, 0.68]} />
          <meshStandardMaterial {...materials.mattress} />
        </mesh>
        <mesh position={[-0.28, -0.06, 0]}>
          <boxGeometry args={[0.55, 0.04, 0.68]} />
          <meshStandardMaterial {...materials.mattressSide} />
        </mesh>
        <mesh position={[-0.48, 0.08, 0]} castShadow>
          <boxGeometry args={[0.18, 0.08, 0.42]} />
          <meshStandardMaterial {...materials.mattress} />
        </mesh>
      </group>

      {isElectric ? (
        <group position={[0.55, 0.08, 0.48]}>
          <mesh castShadow>
            <boxGeometry args={[0.14, 0.05, 0.08]} />
            <meshStandardMaterial {...materials.dark} />
          </mesh>
          <mesh position={[0, 0.035, 0]}>
            <boxGeometry args={[0.1, 0.02, 0.05]} />
            <meshStandardMaterial {...materials.accent} />
          </mesh>
        </group>
      ) : (
        <group position={[0.35, 0.05, -0.42]} rotation={[0, 0, Math.PI / 8]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.018, 0.018, 0.28, 10]} />
            <meshStandardMaterial {...materials.dark} />
          </mesh>
          <mesh position={[0, 0.16, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.015, 0.015, 0.14, 10]} />
            <meshStandardMaterial {...materials.frame} />
          </mesh>
        </group>
      )}
    </group>
  )
}
