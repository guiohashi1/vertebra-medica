import { ProductViewer } from './ProductViewer'
import { ProductModel } from '../three/ProductModel'

export function HeroStage3D() {
  return (
    <ProductViewer
      productId="eletrica"
      autoRotate
      cameraPosition={[2.4, 1.5, 3.2]}
      target={[0.95, 0.2, 0]}
      hint=""
      shadowY={-0.7}
    >
      <ProductModel id="eletrica" position={[0.95, 0, 0]} height={1.45} />
    </ProductViewer>
  )
}
