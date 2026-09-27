import { ProductViewer } from './ProductViewer'
import { ProductModel } from '../three/ProductModel'
import { SwapIn } from '../three/SwapIn'
import { usePerf } from './PerfProvider'

export function HeroStage3D() {
  const mode = usePerf()
  const full = mode === 'full'

  return (
    <ProductViewer
      productId="eletrica"
      autoRotate
      cameraPosition={[3.1, 1.55, 3.8]}
      target={[0, 0.05, 0]}
      hint=""
      shadowY={-0.7}
    >
      <SwapIn animate={full} scrollSpin={full ? 1.1 : undefined}>
        <ProductModel id="eletrica" height={1.45} />
      </SwapIn>
    </ProductViewer>
  )
}
