import { motion } from 'motion/react'
import { BUSINESS } from '../data/business.js'
import Logo from './Logo.jsx'

const PENDING = 'Por confirmar'

function Row({ label, value, href }) {
  return (
    <div className="border-t border-line py-4">
      <dt className="type-slug text-muted">{label}</dt>
      <dd className="mt-1 text-lg font-semibold italic [overflow-wrap:anywhere]">
        {value && href && <a href={href} className="underline decoration-yellow underline-offset-4 hover:text-yellow">{value}</a>}
        {value && !href && value}
        {!value && <span className="font-normal text-muted">{PENDING}</span>}
      </dd>
    </div>
  )
}

export default function Contact() {
  const { email, phone, phoneIntl, whatsapp, address, hours } = BUSINESS
  return (
    <>
      <section id="contacto" className="bg-ink">
        <div className="mx-auto grid max-w-[1500px] grid-cols-[minmax(0,1fr)] items-center gap-10 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <motion.figure
            initial={{ opacity: 0, rotate: 0, y: 30 }}
            whileInView={{ opacity: 1, rotate: -1.5, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-sheet p-2 pb-3 shadow-2xl"
          >
            <img
              src="/cartel-local.webp"
              width="1600"
              height="518"
              loading="lazy"
              alt="Cartel del local de JP Servicios Publicitarios, con el logo y la lista de servicios de impresión"
              className="block h-auto w-full"
            />
            <figcaption className="type-slug mt-2 px-1 text-ink">El cartel de nuestro local</figcaption>
          </motion.figure>

          <div>
            <p className="type-slug text-yellow">Contacto</p>
            <h2 className="type-display mt-3 text-[2.15rem] min-[400px]:text-5xl md:text-6xl">Hablemos de tu próximo cartel</h2>
            <dl className="mt-8">
              <Row label="Email" value={email} href={`mailto:${email}`} />
              <Row label="Teléfono" value={phone} href={phone ? `tel:${phoneIntl}` : null} />
              {whatsapp && <Row label="WhatsApp" value="Escríbenos por WhatsApp" href={`https://wa.me/${whatsapp}`} />}
              <Row label="Dirección" value={address} />
              <Row label="Horario" value={hours} />
            </dl>
          </div>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-8">
          <Logo withTagline className="h-28 w-auto self-start md:self-auto" />
          <div className="flex h-3 w-40" aria-hidden="true">
            <i className="flex-1 bg-cyan" />
            <i className="flex-1 bg-magenta" />
            <i className="flex-1 bg-yellow" />
            <i className="flex-1 bg-key" />
          </div>
          <p className="type-slug text-muted">Prototipo · Datos sujetos a confirmación</p>
        </div>
      </footer>
    </>
  )
}
