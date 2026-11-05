import { useRef, useState } from 'react'
import { motion, useMotionTemplate, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { PRINT_STEPS } from '../data/business.js'
import { SHARDS } from './Logo.jsx'

const PASSES = PRINT_STEPS.length

/** Cada plancha imprime su tinta. El multiply genera los colores secundarios al superponerse. */
function PlateArt({ plate }) {
  if (plate === 'C') {
    return (
      <>
        <path d={SHARDS.cyan} fill="var(--cyan)" transform="translate(-300 -120) scale(1.7)" />
        <rect x="0" y="740" width="600" height="60" fill="var(--cyan)" />
      </>
    )
  }
  if (plate === 'M') {
    return (
      <>
        <path d={SHARDS.magenta} fill="var(--magenta)" transform="translate(-230 -300) scale(1.9)" />
        <rect x="300" y="740" width="300" height="60" fill="var(--magenta)" />
      </>
    )
  }
  if (plate === 'Y') {
    return (
      <>
        <defs>
          <pattern id="print-dots" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
            <circle cx="9" cy="9" r="6" fill="var(--yellow)" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="600" height="540" fill="url(#print-dots)" />
        <path d={SHARDS.yellow} fill="var(--yellow)" transform="translate(-150 -420) scale(1.6)" />
      </>
    )
  }
  return (
    <g fill="var(--key)" fontFamily="var(--font-display)" fontStyle="italic" fontWeight="900">
      <text x="34" y="622" fontSize="84" textLength="530" lengthAdjust="spacingAndGlyphs">TU MARCA,</text>
      <text x="34" y="702" fontSize="84" textLength="530" lengthAdjust="spacingAndGlyphs">EN GRANDE</text>
      <text x="36" y="728" fontSize="17" fontFamily="var(--font-mono)" fontStyle="normal" fontWeight="500">
        JP SERVICIOS PUBLICITARIOS
      </text>
    </g>
  )
}

function Plate({ plate, index, progress }) {
  const hidden = useTransform(progress, [index / PASSES, (index + 1) / PASSES], [100, 0], { clamp: true })
  const clipPath = useMotionTemplate`inset(0 0 ${hidden}% 0)`
  return (
    <motion.svg
      viewBox="0 0 600 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ clipPath }}
      className="absolute inset-0 size-full mix-blend-multiply"
    >
      <PlateArt plate={plate} />
    </motion.svg>
  )
}

export default function PrintRun() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setActive(Math.min(PASSES - 1, Math.floor(value * PASSES)))
  })

  // El carro baja por el pliego en cada pasada y sube para la siguiente.
  const headTop = useTransform(scrollYProgress, (value) => {
    if (value >= 1) return '100%'
    return `${((value * PASSES) % 1) * 100}%`
  })
  const percent = useTransform(scrollYProgress, (value) => `${Math.round(value * 100)}%`)

  return (
    <section id="proceso" ref={ref} className="relative h-[420vh] bg-ink">
      <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-center overflow-hidden">
        <div className="mx-auto grid h-full w-full max-w-[1500px] grid-cols-[minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)] gap-4 px-4 py-5 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-14 lg:py-8">
          <div className="flex flex-col justify-center">
            <p className="type-slug text-yellow">Del pedido al pliego</p>
            <h2 className="type-display mt-2 text-3xl sm:text-5xl lg:text-7xl">Cuatro tintas, cuatro pasos</h2>
            <ol className="mt-4 lg:mt-10">
              {PRINT_STEPS.map((step, index) => {
                const isActive = index === active
                return (
                  <li
                    key={step.plate}
                    aria-current={isActive ? 'step' : undefined}
                    className={`flex items-start gap-4 border-t border-line py-2 transition-opacity duration-300 lg:py-4 ${isActive ? 'opacity-100 max-lg:min-h-20' : 'opacity-60 max-lg:hidden'}`}
                  >
                    <span className="type-display w-9 shrink-0 text-3xl lg:text-4xl" style={{ color: step.color }}>
                      {step.plate}
                    </span>
                    <div>
                      <h3 className="font-extrabold italic lg:text-xl">{step.title}</h3>
                      <p className="mt-0.5 text-sm text-muted lg:text-base">{step.text}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="flex min-h-0 items-center justify-center [container-type:size]">
            <div className="relative aspect-[3/4] w-[min(calc(100cqw-1.5rem),calc((100cqh-1.5rem)*0.75))]">
              <div className="absolute inset-0 isolate overflow-hidden bg-sheet shadow-2xl">
                {PRINT_STEPS.map((step, index) => (
                  <Plate key={step.plate} plate={step.plate} index={index} progress={scrollYProgress} />
                ))}
              </div>
              <motion.div
                style={{ top: headTop }}
                aria-hidden="true"
                className="absolute -inset-x-3 z-10 flex h-5 -translate-y-1/2 items-center gap-1 bg-key px-2"
              >
                {PRINT_STEPS.map((step, index) => (
                  <i
                    key={step.plate}
                    className={`h-2 flex-1 transition-opacity ${index === active ? 'opacity-100' : 'opacity-25'}`}
                    style={{ background: step.color }}
                  />
                ))}
              </motion.div>
              <motion.p className="type-slug absolute -bottom-1 right-1 translate-y-full bg-ink px-1 text-muted">
                {percent}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
