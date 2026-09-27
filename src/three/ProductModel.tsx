import { Center, Resize, useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import type { ProductId } from '../config'
import { productModels } from '../config'
import { MattressModel } from './MattressModel'

type GlbModelProps = {
  path: string
  /** Tamanho aproximado do maior eixo na cena. */
  size?: number
  position?: [number, number, number]
}

export function GlbModel({
  path,
  size = 2.4,
  position = [0, 0, 0],
}: GlbModelProps) {
  const { scene } = useGLTF(path)
  const clone = useMemo(() => scene.clone(true), [scene])

  return (
    <group position={position}>
      <Center>
        <group scale={size}>
          <Resize>
            <primitive object={clone} />
          </Resize>
        </group>
      </Center>
    </group>
  )
}

type ProductModelProps = {
  id: ProductId
  position?: [number, number, number]
  /** Mantido por compatibilidade com as seções; mapeia para size do GLB. */
  height?: number
}

export function ProductModel({ id, position, height = 1.4 }: ProductModelProps) {
  const model = productModels[id]

  if (model.kind === 'procedural' && model.procedural === 'mattress') {
    return (
      <group position={position ?? [0, -0.28, 0]} scale={height * 0.9}>
        <MattressModel animated={false} />
      </group>
    )
  }

  if (model.kind === 'glb' && model.path) {
    // height ~1.4 → size ~2.4 (cama é mais larga que alta)
    const size = height * 1.7
    return <GlbModel path={model.path} position={position} size={size} />
  }

  return null
}

useGLTF.preload('/models/cama-eletrica.glb')
useGLTF.preload('/models/cama-manual.glb')
