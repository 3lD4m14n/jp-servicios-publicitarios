import { useEffect } from 'react'
import { animate, motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react'
import HalftoneField from './HalftoneField.jsx'

const SPRING = { stiffness: 90, damping: 16 }
const SMALL_QUERY = '(max-width: 639px)'
// En móvil la letra es más estrecha para que el titular quepa con buen tamaño.
const stretchFor = (small) => (small ? 76 : 125)

/** Una tinta fuera de registro: la misma línea, desplazada según el puntero. */
function InkPlate({ children, color, x, y }) {
  return (
    <motion.span aria-hidden="true" style={{ x, y, color }} className="absolute inset-0 block mix-blend-screen">
      {children}
    </motion.span>
  )
}

function RegisteredLine({ children, mx, my, spread }) {
  const cx = useTransform(() => -5 * spread.get() + mx.get() * -16)
  const cy = useTransform(() => -3 * spread.get() + my.get() * -9)
  const mX = useTransform(() => 6 * spread.get() + mx.get() * 14)
  const mY = useTransform(() => 2 * spread.get() + my.get() * -7)
  const yX = useTransform(() => 1 * spread.get() + mx.get() * -7)
  const yY = useTransform(() => 6 * spread.get() + my.get() * 13)
  return (
    <span className="relative block whitespace-nowrap">
      <InkPlate color="var(--cyan)" x={cx} y={cy}>{children}</InkPlate>
      <InkPlate color="var(--magenta)" x={mX} y={mY}>{children}</InkPlate>
      <InkPlate color="var(--yellow)" x={yX} y={yY}>{children}</InkPlate>
      <span className="relative text-paper">{children}</span>
    </span>
  )
}

function CropMark({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={`absolute size-6 text-silver-dark ${className}`} aria-hidden="true">
      <path d="M12 0v9M12 15v9M0 12h9M15 12h9" stroke="currentColor" />
      <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" />
    </svg>
  )
}

export default function Hero() {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, SPRING)
  const my = useSpring(rawY, SPRING)
  // Al cargar, las tintas llegan muy separadas y se acomodan. El ancho de la letra arranca
  // ya en su valor final para que el titular no cambie de tamaño al terminar de cargar.
  const spread = useMotionValue(9)
  const stretch = useMotionValue(stretchFor(window.matchMedia(SMALL_QUERY).matches))
  const fontVariationSettings = useMotionTemplate`"wdth" ${stretch}`

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia(SMALL_QUERY)
    let running
    const settle = () => {
      stretch.set(stretchFor(small.matches))
      const target = small.matches ? 0.45 : 1
      running?.stop()
      if (reduced) spread.set(target)
      else running = animate(spread, target, { duration: 1.5, ease: [0.16, 1, 0.3, 1] })
    }
    settle()
    small.addEventListener('change', settle)
    return () => {
      small.removeEventListener('change', settle)
      running?.stop()
    }
  }, [spread, stretch])

  const onPointerMove = (event) => {
    // Solo con ratón: en pantallas táctiles el efecto quedaba trabado donde se tocó.
    if (event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2)
    rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2)
  }

  return (
    <section id="inicio" className="px-2 pt-2 md:px-4 md:pt-4">
      {/* El panel imita el cartel real: marco de aluminio y ménsulas. */}
      <div className="metal mx-auto max-w-[1700px] p-1 md:p-1.5">
        <div
          onPointerMove={onPointerMove}
          className="animate-sign-on relative isolate flex min-h-[calc(100svh-7.5rem)] flex-col justify-between overflow-hidden bg-ink"
        >
          <HalftoneField className="absolute inset-0 -z-10 size-full opacity-40 sm:opacity-80" />

          <CropMark className="left-3 top-3" />
          <CropMark className="right-3 top-3" />
          <CropMark className="bottom-3 left-3" />
          <CropMark className="bottom-3 right-3" />

          <p className="type-slug px-12 pt-5 text-paper">Impresión solvente · eco solvente 1440 · UV</p>

          <div className="px-4 py-10 md:px-12">
            <motion.h1
              style={{ fontVariationSettings }}
              className="type-display text-[15vw] sm:text-[10.4vw] min-[1700px]:text-[176px]"
            >
              <RegisteredLine mx={mx} my={my} spread={spread}>Imprimimos</RegisteredLine>
              <RegisteredLine mx={mx} my={my} spread={spread}>en grande.</RegisteredLine>
            </motion.h1>
          </div>

          <div className="flex flex-col gap-6 px-4 pb-14 md:flex-row md:items-end md:justify-between md:px-12">
            <p className="max-w-xl text-lg font-medium italic leading-snug text-paper md:text-xl">
              Carteles, letras corpóreas, gigantografías, banners, plotter y flyers. Impresión UV sobre PVC, alto impacto, coroplast y acrílico.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#arma-tu-cartel" className="btn btn-primary">Armar mi cartel</a>
              <a href="#catalogo" className="btn btn-ghost">Ver catálogo</a>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1500px] justify-around" aria-hidden="true">
        <span className="metal h-5 w-3" />
        <span className="metal h-5 w-3" />
      </div>
    </section>
  )
}
