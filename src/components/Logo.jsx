import { useId } from 'react'

/** Recreación vectorial del logo a partir de la foto. Reemplazar por el original si lo entregan. */
export const SHARDS = {
  cyan: 'M430 115 478 178 476 338 420 408 430 215 416 282 376 232 380 178Z',
  magenta: 'M222 222H295L374 328 372 432 290 322 268 282 272 352 238 358 212 318Z',
  yellow: 'M176 425H300L350 498 205 500 250 512 205 572H178L122 495Z',
  key: 'M292 565H370L310 650 300 680 262 712 205 685Z',
}

const LETTER_J =
  'M592 285H710L670 480H605L590 566H425Q390 566 394 530L408 462Q411 446 430 446H512L496 530H548Z'
const LETTER_P =
  'M605 488H840Q875 488 870 525L850 660Q845 692 810 692H675L655 772H550ZM722 510 680 668H745L770 510Z'

export default function Logo({ className = '', withTagline = false }) {
  const metal = useId()
  return (
    <svg
      viewBox={withTagline ? '110 100 780 800' : '110 100 780 690'}
      className={className}
      role="img"
      aria-label="JP Servicios Publicitarios"
    >
      <defs>
        <linearGradient id={metal} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="var(--silver-dark)" />
          <stop offset=".28" stopColor="var(--paper)" />
          <stop offset=".46" stopColor="var(--silver)" />
          <stop offset=".62" stopColor="var(--sheet)" />
          <stop offset="1" stopColor="var(--silver-dark)" />
        </linearGradient>
      </defs>
      <path d={SHARDS.cyan} fill="var(--cyan)" />
      <path d={SHARDS.magenta} fill="var(--magenta)" />
      <path d={SHARDS.yellow} fill="var(--yellow)" />
      <path d={SHARDS.key} fill="var(--key)" stroke="var(--silver)" strokeWidth="3" />
      <g transform="translate(-7 3)" fill="var(--magenta)" fillRule="evenodd">
        <path d={LETTER_J} />
        <path d={LETTER_P} />
      </g>
      <g fill={`url(#${metal})`} fillRule="evenodd">
        <path d={LETTER_J} />
        <path d={LETTER_P} />
      </g>
      <text x="755" y="282" fontSize="46" fill="var(--silver)" fontFamily="var(--font-sans)">
        ®
      </text>
      {withTagline && (
        <text
          x="490"
          y="875"
          textAnchor="middle"
          fontSize="64"
          fontWeight="600"
          fontStyle="italic"
          fill="var(--paper)"
          fontFamily="var(--font-sans)"
        >
          servicios publicitarios
        </text>
      )}
    </svg>
  )
}
