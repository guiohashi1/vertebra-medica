import { Suspense } from 'react'
import { ProductViewer } from './ProductViewer'
import { ProductModel } from '../three/ProductModel'
import { SwapIn } from '../three/SwapIn'
import { usePerf } from './PerfProvider'
import type { ProductId } from '../config'

type CatalogViewerProps = {
  id: ProductId
}

export function CatalogViewer({ id }: CatalogViewerProps) {
  const mode = usePerf()

  return (
    <ProductViewer
      productId={id}
      autoRotate
      cameraPosition={[3, 1.55, 3.6]}
      target={[0, 0.1, 0]}
      shadowY={-0.7}
      shadowKey={id}
    >
      <Suspense fallback={null}>
        <SwapIn key={id} animate={mode !== 'static'}>
          <ProductModel id={id} height={1.4} />
        </SwapIn>
      </Suspense>
    </ProductViewer>
  )
}
