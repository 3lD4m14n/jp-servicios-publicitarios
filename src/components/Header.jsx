import Logo from './Logo.jsx'

const LINKS = [
  ['#catalogo', 'Catálogo'],
  ['#proceso', 'Proceso'],
  ['#arma-tu-cartel', 'Arma tu cartel'],
  ['#contacto', 'Contacto'],
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink-deep/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-4 px-4 md:px-8">
        <a href="#inicio" className="flex items-center gap-3" aria-label="JP Servicios Publicitarios, inicio">
          <Logo className="h-11 w-auto" />
          <span className="hidden text-sm font-semibold italic text-paper sm:block">
            servicios publicitarios
          </span>
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-7 md:flex">
          {LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-sm font-semibold italic text-muted transition-colors hover:text-paper"
            >
              {label}
            </a>
          ))}
        </nav>
        <a href="#arma-tu-cartel" className="btn btn-primary !min-h-10 !px-5 !py-2 md:!hidden">
          Cotizar
        </a>
      </div>
    </header>
  )
}
