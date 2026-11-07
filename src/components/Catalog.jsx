import { useState } from 'react'
import { motion } from 'motion/react'
import { PRODUCTS, TECH_FILTERS } from '../data/business.js'
import { SAMPLES } from './ProductSamples.jsx'

// Tamaños distintos, como planchas de distinto formato sobre la mesa de trabajo.
const SPANS = {
  gigantografias: 'sm:col-span-2 lg:col-span-4',
  carteles: 'lg:col-span-2',
  letras: 'lg:col-span-2',
  banner: 'lg:col-span-2',
  plotter: 'lg:col-span-2',
  flyers: 'lg:col-span-2',
  rollo: 'lg:col-span-2',
  cama: 'sm:col-span-2 lg:col-span-2',
  pvc: 'lg:col-span-2',
  coroplast: 'lg:col-span-2',
  acrilico: 'sm:col-span-2 lg:col-span-2',
}

export default function Catalog() {
  const [filter, setFilter] = useState(TECH_FILTERS[0])

  return (
    <section id="catalogo" className="mx-auto max-w-[1500px] px-4 py-20 md:px-8 md:py-28">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="type-slug text-yellow">Catálogo</p>
          <h2 className="type-display mt-3 text-[2.15rem] min-[400px]:text-5xl md:text-7xl">
            Lo que sale<br />de nuestras máquinas
          </h2>
        </div>
        <div role="group" aria-label="Filtrar por tecnología" className="flex flex-wrap gap-2">
          {TECH_FILTERS.map((tech) => (
            <button
              key={tech}
              type="button"
              aria-pressed={filter === tech}
              onClick={() => setFilter(tech)}
              className={`btn !min-h-11 !px-5 !py-2 ${filter === tech ? 'btn-primary' : 'btn-ghost'}`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {PRODUCTS.map((product, index) => {
          const Sample = SAMPLES[product.id]
          const active = filter === TECH_FILTERS[0] || filter === product.tech
          return (
            <motion.li
              key={product.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: (index % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className={`group ${SPANS[product.id]} transition-[filter,opacity] duration-300 ${active ? '' : 'opacity-25 grayscale'}`}
            >
              <article className="slanted-panel flex h-full min-h-72 flex-col bg-ink-raised">
                <div className="relative min-h-44 flex-1 overflow-hidden bg-ink">
                  <Sample />
                </div>
                <div className="p-5">
                  <p className="type-slug text-muted">{product.tech}</p>
                  <h3 className="mt-1.5 text-xl font-extrabold italic leading-tight">{product.name}</h3>
                  <p className="mt-1 text-sm leading-snug text-muted">{product.note}</p>
                </div>
              </article>
            </motion.li>
          )
        })}
      </ul>
    </section>
  )
}
