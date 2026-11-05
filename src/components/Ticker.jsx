import { TICKER_ITEMS } from '../data/business.js'

const DOTS = ['bg-cyan', 'bg-magenta', 'bg-yellow', 'bg-silver']

function Row({ hidden = false }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {TICKER_ITEMS.map((item, index) => (
        <li key={item} className="type-display flex items-center whitespace-nowrap text-2xl text-ink-deep md:text-4xl">
          <span className="px-6">{item}</span>
          <span className={`shape-slant h-5 w-8 ${DOTS[index % DOTS.length]}`} aria-hidden="true" />
        </li>
      ))}
    </ul>
  )
}

export default function Ticker() {
  return (
    <div className="overflow-clip py-4">
      <div className="-rotate-1 scale-[1.02] overflow-hidden bg-paper py-3 md:py-4">
        <div className="animate-marquee flex w-max">
          <Row />
          <Row hidden />
        </div>
      </div>
    </div>
  )
}
