import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Ticker from './components/Ticker.jsx'
import Catalog from './components/Catalog.jsx'
import PrintRun from './components/PrintRun.jsx'
import SignBuilder from './components/SignBuilder.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Catalog />
        <PrintRun />
        <SignBuilder />
        <Contact />
      </main>
    </>
  )
}
