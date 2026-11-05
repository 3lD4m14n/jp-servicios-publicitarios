import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { BUSINESS, MATERIALS, SIGN_COLORS } from '../data/business.js'

const PERSON_HEIGHT = 1.7
const MOUNT_HEIGHT = 0.6 // Altura del cartel sobre el piso en el dibujo.
const LABEL_FONT = { fontFamily: 'var(--font-mono)' }

const MEASURE_SIZE = 1 // Pequeño a propósito: Chromium limita las fuentes enormes y falsearía la medida.

/** Mide el ancho real del texto para que nunca se salga del cartel, sea cual sea su contenido. */
function useTextFit(text, width, height) {
  const measureRef = useRef(null)
  const [unitWidth, setUnitWidth] = useState(1)

  useLayoutEffect(() => {
    let cancelled = false
    const measure = () => {
      if (!cancelled && measureRef.current) {
        setUnitWidth(measureRef.current.getComputedTextLength() / MEASURE_SIZE || 1)
      }
    }
    measure()
    document.fonts.ready.then(measure) // La fuente puede terminar de cargar después.
    return () => {
      cancelled = true
    }
  }, [text])

  return { measureRef, fontSize: Math.min((width * 0.86) / unitWidth, height * 0.62) }
}

function MaterialFinish({ material, x, y, w, h }) {
  if (material === 'gigantografia') {
    const inset = Math.min(0.12, w * 0.05, h * 0.1)
    const columns = Math.max(2, Math.round(w / 0.9) + 1)
    return Array.from({ length: columns }).flatMap((_, i) => {
      const cx = x + inset + ((w - inset * 2) * i) / (columns - 1)
      return [y + inset, y + h - inset].map((cy) => (
        <circle key={`${i}-${cy}`} cx={cx} cy={cy} r={inset * 0.32} fill="var(--silver)" stroke="var(--ink-deep)" strokeWidth={inset * 0.08} />
      ))
    })
  }
  if (material === 'coroplast') {
    return <rect x={x} y={y} width={w} height={h} fill="url(#flute)" />
  }
  if (material === 'acrilico') {
    const inset = Math.min(0.1, w * 0.05, h * 0.1)
    return (
      <>
        <rect x={x} y={y} width={w} height={h} fill="url(#gloss)" />
        {[[x + inset, y + inset], [x + w - inset, y + inset], [x + inset, y + h - inset], [x + w - inset, y + h - inset]].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={inset * 0.42} fill="var(--silver)" />
        ))}
      </>
    )
  }
  return null // El PVC es liso: su espesor se dibuja en el canto.
}

function Preview({ text, width, height, material, color }) {
  const signX = 0.5
  const personX = signX + width + 0.55
  const viewWidth = personX + 1
  const totalHeight = Math.max(height + MOUNT_HEIGHT, PERSON_HEIGHT) + 0.75
  const signY = totalHeight - MOUNT_HEIGHT - height
  const edge = Math.min(0.05, height * 0.04)
  const label = Math.max(viewWidth, totalHeight) * 0.024
  const ground = totalHeight
  const { measureRef, fontSize } = useTextFit(text.toUpperCase(), width, height)

  return (
    <svg
      viewBox={`0 0 ${viewWidth} ${totalHeight + 0.12}`}
      className="size-full"
      role="img"
      aria-label={`Vista a escala: cartel de ${width} por ${height} metros junto a una persona de ${PERSON_HEIGHT} metros`}
    >
      <defs>
        <pattern id="meter-grid" width="1" height="1" patternUnits="userSpaceOnUse" y={ground % 1}>
          <path d="M1 0H0V1" fill="none" stroke="var(--line)" strokeWidth={label * 0.05} />
        </pattern>
        <pattern id="flute" width=".05" height="1" patternUnits="userSpaceOnUse">
          <rect width=".006" height="1" fill="var(--ink-deep)" opacity=".18" />
        </pattern>
        <linearGradient id="gloss" x1="0" y1="0" x2="1" y2="1">
          <stop offset=".25" stopColor="var(--sheet)" stopOpacity="0" />
          <stop offset=".42" stopColor="var(--sheet)" stopOpacity=".42" />
          <stop offset=".56" stopColor="var(--sheet)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <text ref={measureRef} fontSize={MEASURE_SIZE} className="type-display" visibility="hidden" aria-hidden="true">
        {text.toUpperCase()}
      </text>
      <rect width={viewWidth} height={ground} fill="url(#meter-grid)" />

      {material === 'pvc' && (
        <rect x={signX + edge} y={signY + edge} width={width} height={height} fill="var(--silver-dark)" />
      )}
      <rect
        x={signX}
        y={signY}
        width={width}
        height={height}
        stroke="var(--silver)"
        strokeWidth={Math.min(0.04, height * 0.04)}
        style={{ fill: color.bg, transition: 'fill .25s' }}
      />
      <MaterialFinish material={material} x={signX} y={signY} w={width} h={height} />
      <text
        x={signX + width / 2}
        y={signY + height / 2}
        dominantBaseline="central"
        textAnchor="middle"
        fontSize={fontSize}
        className="type-display"
        style={{ fill: color.fg, lineHeight: 1 }}
      >
        {text.toUpperCase()}
      </text>

      {/* Cotas */}
      <g stroke="var(--yellow)" strokeWidth={label * 0.07}>
        <path d={`M${signX} ${signY - label * 0.8}h${width}`} />
        <path d={`M${signX - label * 0.8} ${signY}v${height}`} />
      </g>
      <text x={signX + width / 2} y={signY - label * 1.2} textAnchor="middle" fontSize={label} fill="var(--yellow)" style={LABEL_FONT}>
        {width.toFixed(1)} m
      </text>
      <text
        x={signX - label * 1.3}
        y={signY + height / 2}
        textAnchor="middle"
        fontSize={label}
        fill="var(--yellow)"
        style={LABEL_FONT}
        transform={`rotate(-90 ${signX - label * 1.3} ${signY + height / 2})`}
      >
        {height.toFixed(1)} m
      </text>

      {/* Persona de referencia: 1,70 m */}
      <g transform={`translate(${personX} ${ground - PERSON_HEIGHT}) scale(${PERSON_HEIGHT / 50})`} fill="var(--paper)">
        <circle cx="10" cy="6" r="5" />
        <path d="M3 13h14l-2 18v19h-4V33H9v17H5V31Z" />
      </g>
      <text x={personX + 0.28} y={ground - PERSON_HEIGHT - label * 0.6} textAnchor="middle" fontSize={label} fill="var(--muted)" style={LABEL_FONT}>
        {PERSON_HEIGHT.toFixed(2)} m
      </text>
      <path d={`M0 ${ground}H${viewWidth}`} stroke="var(--silver-dark)" strokeWidth={label * 0.1} />
    </svg>
  )
}

function Slider({ id, label, value, min, max, onChange }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-bold italic">{label}</label>
        <output htmlFor={id} className="type-slug text-yellow">{value.toFixed(1)} m</output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step="0.1"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 h-8 w-full cursor-pointer accent-yellow"
      />
    </div>
  )
}

export default function SignBuilder() {
  const [text, setText] = useState('Tu marca')
  const [width, setWidth] = useState(4)
  const [height, setHeight] = useState(1.5)
  const [materialId, setMaterialId] = useState(MATERIALS[0].id)
  const [colorId, setColorId] = useState(SIGN_COLORS[0].id)
  const [copied, setCopied] = useState(false)

  const material = MATERIALS.find((item) => item.id === materialId)
  const color = SIGN_COLORS.find((item) => item.id === colorId)
  const area = width * height

  const message = useMemo(
    () =>
      [
        'Hola, quisiera pedir una cotización:',
        '',
        `Texto: ${text || '(sin definir)'}`,
        `Medidas: ${width.toFixed(1)} x ${height.toFixed(1)} m (${area.toFixed(1)} m²)`,
        `Material: ${material.name}`,
        `Color de fondo: ${color.name}`,
      ].join('\n'),
    [text, width, height, area, material, color],
  )
  const mailto = `mailto:${BUSINESS.email}?subject=${encodeURIComponent('Cotización de cartel')}&body=${encodeURIComponent(message)}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="arma-tu-cartel" className="mx-auto max-w-[1500px] px-4 py-20 md:px-8 md:py-28">
      <p className="type-slug text-yellow">Herramienta</p>
      <h2 className="type-display mt-3 text-[2.15rem] min-[400px]:text-5xl md:text-7xl">Arma tu cartel a escala</h2>
      <p className="mt-4 max-w-2xl text-lg italic text-muted">
        Prueba medidas junto a una persona de referencia y envía el pedido ya armado.
      </p>

      <div className="mt-10 flex flex-col gap-3 lg:grid lg:grid-cols-[minmax(320px,420px)_minmax(0,1fr)] lg:grid-rows-[1fr_auto]">
        <form className="slanted-panel order-2 space-y-6 bg-ink-raised p-6 md:p-8 lg:col-start-1 lg:row-span-2 lg:row-start-1" onSubmit={(event) => event.preventDefault()}>
          <div>
            <label htmlFor="sign-text" className="text-sm font-bold italic">Texto del cartel</label>
            <input
              id="sign-text"
              type="text"
              maxLength={28}
              value={text}
              onChange={(event) => setText(event.target.value)}
              className="mt-2 h-12 w-full border border-line bg-ink-deep px-3 font-semibold text-paper"
            />
          </div>

          <Slider id="sign-width" label="Ancho" value={width} min={0.5} max={12} onChange={setWidth} />
          <Slider id="sign-height" label="Alto" value={height} min={0.3} max={6} onChange={setHeight} />

          <fieldset>
            <legend className="text-sm font-bold italic">Material</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {MATERIALS.map((item) => (
                <label
                  key={item.id}
                  className={`cursor-pointer border p-2.5 transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-yellow ${materialId === item.id ? 'border-yellow bg-ink-deep' : 'border-line hover:border-silver-dark'}`}
                >
                  <input
                    type="radio"
                    name="material"
                    value={item.id}
                    checked={materialId === item.id}
                    onChange={() => setMaterialId(item.id)}
                    className="sr-only"
                  />
                  <span className="block text-sm font-bold italic">{item.name}</span>
                  <span className="block text-xs leading-tight text-muted">{item.note}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-bold italic">Color de fondo</legend>
            <div className="mt-2 flex gap-2">
              {SIGN_COLORS.map((item) => (
                <label
                  key={item.id}
                  title={item.name}
                  style={{ background: item.bg }}
                  className={`size-11 cursor-pointer border-2 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-yellow ${colorId === item.id ? 'border-paper' : 'border-line'}`}
                >
                  <input
                    type="radio"
                    name="sign-color"
                    value={item.id}
                    aria-label={item.name}
                    checked={colorId === item.id}
                    onChange={() => setColorId(item.id)}
                    className="sr-only"
                  />
                </label>
              ))}
            </div>
          </fieldset>
        </form>

        {/* En móvil la vista previa queda fija arriba para ver el efecto de cada control. */}
        <div className="relative order-1 aspect-[16/10] border border-line bg-ink-deep max-lg:sticky max-lg:top-16 max-lg:z-10 lg:col-start-2 lg:row-start-1 lg:aspect-auto lg:min-h-[420px]">
          <div className="absolute inset-2 md:inset-6">
            <Preview text={text} width={width} height={height} material={materialId} color={color} />
          </div>
        </div>

        <div className="order-3 lg:col-start-2 lg:row-start-2">
          <div className="flex flex-col gap-4 bg-ink p-5 md:flex-row md:items-center md:justify-between">
            <dl className="flex gap-8">
              <div>
                <dt className="type-slug text-muted">Área</dt>
                <dd className="text-2xl font-extrabold italic">{area.toFixed(1)} m²</dd>
              </div>
              <div>
                <dt className="type-slug text-muted">Material</dt>
                <dd className="text-2xl font-extrabold italic">{material.name}</dd>
              </div>
            </dl>
            <div className="flex flex-wrap gap-2">
              <a href={mailto} className="btn btn-primary">Pedir cotización</a>
              <button type="button" onClick={copy} className="btn btn-ghost" aria-live="polite">
                {copied ? 'Copiado' : 'Copiar pedido'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
