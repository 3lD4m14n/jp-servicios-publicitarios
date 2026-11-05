/** Muestras dibujadas con CSS/SVG. No usan fotos de stock que parezcan trabajos reales de la empresa. */
import { SHARDS } from './Logo.jsx'

function Gigantografias() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="type-display absolute -left-4 bottom-6 whitespace-nowrap text-[clamp(6rem,13vw,13rem)] !leading-[0.72] text-cyan transition-transform duration-700 group-hover:-translate-x-10">
        Gigante
      </div>
      <div className="absolute inset-x-0 bottom-6 h-px bg-silver-dark" />
      <svg viewBox="0 0 20 50" className="absolute bottom-6 right-[14%] h-14 text-paper" aria-hidden="true">
        <circle cx="10" cy="6" r="5" fill="currentColor" />
        <path d="M3 15h14l-2 17v18h-4V33H9v17H5V32Z" fill="currentColor" />
      </svg>
    </div>
  )
}

function Carteles() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-7">
      <div className="metal w-full max-w-64 p-1 transition-transform duration-500 group-hover:-rotate-2 group-hover:scale-105">
        <div className="flex h-24 items-center gap-3 bg-ink-deep px-4">
          <span className="flex gap-1" aria-hidden="true">
            <i className="shape-slant h-11 w-5 bg-cyan" />
            <i className="shape-slant h-11 w-5 bg-magenta" />
            <i className="shape-slant h-11 w-5 bg-yellow" />
          </span>
          <span className="type-display text-xl text-paper">Tu marca</span>
        </div>
      </div>
    </div>
  )
}

function Letras() {
  const extrude = Array.from({ length: 10 }, (_, i) => `${i + 1}px ${i + 1}px 0 var(--magenta)`).join(',')
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <span
        className="type-display text-8xl text-paper transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
        style={{ textShadow: extrude }}
      >
        JP
      </span>
    </div>
  )
}

function Flyers() {
  const sheets = [
    ['bg-yellow', '-rotate-12 group-hover:-translate-x-10 group-hover:-rotate-[20deg]'],
    ['bg-magenta', 'rotate-3 group-hover:rotate-0'],
    ['bg-cyan', 'rotate-12 group-hover:translate-x-10 group-hover:rotate-[20deg]'],
  ]
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {sheets.map(([color, motion]) => (
        <div key={color} className={`absolute h-36 w-24 p-2 shadow-lg transition-transform duration-500 ${color} ${motion}`}>
          <div className="h-1/2 bg-ink-deep/25" />
          <div className="mt-2 h-1.5 w-full bg-ink-deep/60" />
          <div className="mt-1 h-1.5 w-2/3 bg-ink-deep/60" />
        </div>
      ))}
    </div>
  )
}

function RolloARollo() {
  const Roll = ({ cx, r }) => (
    <g style={{ transformOrigin: `${cx}px 60px` }} className="animate-roll">
      <circle cx={cx} cy="60" r={r} fill="var(--silver)" />
      <circle cx={cx} cy="60" r={r * 0.32} fill="var(--ink-deep)" />
      <path d={`M${cx} ${60 - r}V${60 - r * 0.32}`} stroke="var(--silver-dark)" strokeWidth="2" />
    </g>
  )
  return (
    <svg viewBox="0 0 280 120" className="absolute inset-0 m-auto w-[85%]" aria-hidden="true">
      <rect x="60" y="24" width="160" height="8" fill="var(--paper)" />
      <rect x="84" y="24" width="24" height="8" fill="var(--cyan)" />
      <rect x="108" y="24" width="24" height="8" fill="var(--magenta)" />
      <rect x="132" y="24" width="24" height="8" fill="var(--yellow)" />
      <Roll cx={60} r={36} />
      <Roll cx={220} r={26} />
    </svg>
  )
}

function CamaPlana() {
  return (
    <div className="absolute inset-x-6 bottom-9 top-9">
      <div className="absolute inset-x-0 bottom-0 h-5 bg-line" />
      <div className="absolute inset-x-[8%] bottom-5 h-2.5 bg-paper" />
      <div className="animate-bed absolute bottom-7 flex h-12 w-5 flex-col gap-0.5" aria-hidden="true">
        <i className="flex-1 bg-cyan" />
        <i className="flex-1 bg-magenta" />
        <i className="flex-1 bg-yellow" />
        <i className="flex-1 bg-silver" />
      </div>
    </div>
  )
}

function Pvc() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="h-24 w-40 bg-paper transition-transform duration-500 group-hover:-rotate-3"
        style={{ boxShadow: '7px 7px 0 var(--silver-dark)' }}
      />
    </div>
  )
}

function Coroplast() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="h-24 w-40 bg-silver transition-[width] duration-500 group-hover:w-48"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, var(--silver-dark) 0 2px, var(--paper) 2px 9px)',
        }}
      />
    </div>
  )
}

function Acrilico() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-24 w-44 overflow-hidden border border-paper/60 bg-paper/10">
        <svg viewBox="100 100 400 620" className="absolute inset-0 m-auto h-20" aria-hidden="true">
          <path d={SHARDS.cyan} fill="var(--cyan)" />
          <path d={SHARDS.magenta} fill="var(--magenta)" />
          <path d={SHARDS.yellow} fill="var(--yellow)" />
          <path d={SHARDS.key} fill="var(--silver)" />
        </svg>
        <div
          className="absolute inset-0 -translate-x-1/3 opacity-60 transition-transform duration-700 group-hover:translate-x-1/3"
          style={{ background: 'linear-gradient(115deg, transparent 35%, var(--sheet) 50%, transparent 65%)' }}
        />
        {['left-1.5 top-1.5', 'right-1.5 top-1.5', 'bottom-1.5 left-1.5', 'bottom-1.5 right-1.5'].map((position) => (
          <i key={position} className={`metal absolute size-2 rounded-full ${position}`} />
        ))}
      </div>
    </div>
  )
}

export const SAMPLES = {
  gigantografias: Gigantografias,
  carteles: Carteles,
  letras: Letras,
  flyers: Flyers,
  rollo: RolloARollo,
  cama: CamaPlana,
  pvc: Pvc,
  coroplast: Coroplast,
  acrilico: Acrilico,
}
