import { useEffect, useRef } from 'react'

const INKS = [
  { token: '--cyan', angle: 0.26, drift: 1 },
  { token: '--magenta', angle: 1.31, drift: 0.8 },
  { token: '--yellow', angle: 0, drift: 0.6 },
]
const STEP = 22

/** Trama de semitonos CMY: los puntos crecen en una onda y alrededor del puntero. */
export default function HalftoneField({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const styles = getComputedStyle(document.documentElement)

    let width = 0
    let height = 0
    let frame = 0
    let visible = true
    const pointer = { x: -1000, y: -1000 }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'screen'
      const reach = Math.hypot(width, height)
      const count = Math.ceil(reach / STEP)
      INKS.forEach((ink, inkIndex) => {
        const cos = Math.cos(ink.angle)
        const sin = Math.sin(ink.angle)
        ctx.fillStyle = styles.getPropertyValue(ink.token).trim() // Se lee en vivo para respetar el tema.
        ctx.beginPath()
        for (let row = -count; row <= count; row++) {
          for (let col = -count; col <= count; col++) {
            const x = width / 2 + (col * cos - row * sin) * STEP
            const y = height / 2 + (col * sin + row * cos) * STEP
            if (x < -STEP || y < -STEP || x > width + STEP || y > height + STEP) continue
            // Densidad: de derecha a izquierda se apaga para no competir con el titular.
            const fade = Math.pow(Math.min(x / width, 1), 1.6)
            const wave = (Math.sin(x * 0.011 + y * 0.008 + time * 0.0008 * ink.drift + inkIndex * 2) + 1) / 2
            const distance = Math.hypot(x - pointer.x, y - pointer.y)
            const lift = Math.max(0, 1 - distance / 190)
            const radius = (fade * wave * 0.72 + lift * 0.7) * STEP * 0.42
            if (radius < 0.5) continue
            ctx.moveTo(x + radius, y)
            ctx.arc(x, y, radius, 0, Math.PI * 2)
          }
        }
        ctx.fill()
      })
    }

    const loop = (time) => {
      draw(time)
      if (visible && !reduced) frame = requestAnimationFrame(loop)
    }
    const start = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(loop)
    }

    const onPointer = (event) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (reduced) draw(0)
    })

    resize()
    observer.observe(canvas)
    resizeObserver.observe(canvas)
    window.addEventListener('pointermove', onPointer, { passive: true })
    start()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', onPointer)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
