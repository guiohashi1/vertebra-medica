import { PerfProvider } from './components/PerfProvider'
import { SmoothScroll } from './components/SmoothScroll'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { TrustStrip } from './components/TrustStrip'
import { Statement } from './components/Statement'
import { Catalog } from './components/Catalog'
import { Compare } from './components/Compare'
import { QuoteForm } from './components/QuoteForm'
import { Footer } from './components/Footer'
import { WhatsAppFloat } from './components/WhatsAppFloat'

export default function App() {
  return (
    <PerfProvider>
      <SmoothScroll>
        <Nav />
        <main>
          <Hero />
          <Statement />
          <Catalog />
          <Compare />
          <TrustStrip />
          <QuoteForm />
        </main>
        <Footer />
        <WhatsAppFloat />
      </SmoothScroll>
    </PerfProvider>
  )
}
