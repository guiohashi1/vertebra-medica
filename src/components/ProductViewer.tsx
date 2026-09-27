import {
  Canvas,
  useThree,
  type RootState,
} from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import {
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useWebGL } from '../hooks/useWebGL'
import { usePerf } from './PerfProvider'
import { ProductFallback } from './ProductFallback'
import type { ProductId } from '../config'

type ProductViewerProps = {
  children: ReactNode
  className?: string
  autoRotate?: boolean
  cameraPosition?: [number, number, number]
  target?: [number, number, number]
  hint?: string
  shadowY?: number
  productId?: ProductId
  /** Mudar a chave refaz a sombra de contato (ex.: ao trocar de modelo). */
  shadowKey?: string
}

function SceneControls({
  autoRotate,
  target,
}: {
  autoRotate: boolean
  target: [number, number, number]
}) {
  const invalidate = useThree((s: RootState) => s.invalidate)

  return (
    <OrbitControls
      enablePan={false}
      enableZoom={false}
      minPolarAngle={Math.PI / 3.2}
      maxPolarAngle={Math.PI / 2.15}
      autoRotate={autoRotate}
      autoRotateSpeed={0.45}
      target={target}
      onChange={() => invalidate()}
      onStart={() => invalidate()}
      onEnd={() => invalidate()}
    />
  )
}

export function ProductViewer({
  children,
  className,
  autoRotate = true,
  cameraPosition = [2.4, 1.6, 2.8],
  target = [0, 0.15, 0],
  hint = 'Arraste para girar',
  shadowY = -0.7,
  productId = 'eletrica',
  shadowKey,
}: ProductViewerProps) {
  const webgl = useWebGL()
  const mode = usePerf()
  const hostRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = hostRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const on = !!entry?.isIntersecting
        setVisible(on)
        if (on) setReady(true)
      },
      { rootMargin: '120px 0px', threshold: 0.01 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (webgl === false || mode === 'static') {
    return (
      <div className={className} style={{ width: '100%', height: '100%' }}>
        <ProductFallback id={productId} />
      </div>
    )
  }

  const lite = mode === 'lite'
  const allowRotate = autoRotate && !lite && visible
  const frameloop = !visible || !ready ? 'never' : allowRotate ? 'always' : 'demand'

  return (
    <div
      ref={hostRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
    >
      {ready && webgl ? (
        <Canvas
          dpr={lite ? 1 : [1, 1.25]}
          frameloop={frameloop}
          camera={{ position: cameraPosition, fov: 38, near: 0.1, far: 40 }}
          gl={{
            antialias: !lite,
            alpha: true,
            powerPreference: 'low-power',
            stencil: false,
            depth: true,
          }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={lite ? 0.85 : 0.7} />
            <directionalLight
              position={[4, 6, 2]}
              intensity={lite ? 1 : 1.25}
              color="#f2f4f5"
            />
            {!lite ? (
              <directionalLight
                position={[-3, 2, -2]}
                intensity={0.45}
                color="#a8b8b6"
              />
            ) : null}
            {children}
            {!lite ? (
              <ContactShadows
                key={shadowKey}
                position={[0, shadowY, 0]}
                opacity={0.3}
                scale={10}
                blur={2.4}
                far={4}
                frames={80}
              />
            ) : null}
            <SceneControls autoRotate={allowRotate} target={target} />
          </Suspense>
        </Canvas>
      ) : (
        <ProductFallback id={productId} />
      )}
      {hint && ready && mode === 'full' ? (
        <p className="product__hint">{hint}</p>
      ) : null}
    </div>
  )
}
