import { ProductViewer } from './ProductViewer'
import { ProductModel } from '../three/ProductModel'
import type { ProductId } from '../config'

type CatalogViewerProps = {
  id: ProductId
  cameraPosition: [number, number, number]
  target: [number, number, number]
  shadowY: number
  height: number
}

export function CatalogViewer({
  id,
  cameraPosition,
  target,
  shadowY,
  height,
}: CatalogViewerProps) {
  return (
    <ProductViewer
      productId={id}
      autoRotate
      cameraPosition={cameraPosition}
      target={target}
      shadowY={shadowY}
    >
      <ProductModel id={id} height={height} />
    </ProductViewer>
  )
}
