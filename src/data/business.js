/**
 * Datos de la empresa, leídos de las fotos del cartel. `null` = no figura en el cartel; completar con el cliente.
 * La interfaz se adapta sola: al completar un valor aparece en la sección de contacto.
 */
export const BUSINESS = {
  name: 'JP Servicios Publicitarios',
  email: 'jp_publicitaria@hotmail.com',
  phone: '0986 291 279', // Tal como se muestra.
  phoneIntl: '+595986291279', // Para enlaces tel:.
  whatsapp: '595986291279', // Celular del cartel. Solo dígitos con código de país.
  address: null,
  hours: null,
}

const eco = 'Eco solvente'
const uv = 'UV'
const extra = 'Papelería'

export const TECH_FILTERS = ['Todo', eco, uv, extra]

// Solvente / eco solvente y UV: columnas del cartel. Papelería: pedido explícito (flyers).
export const PRODUCTS = [
  { id: 'gigantografias', name: 'Gigantografías', tech: eco, note: 'Tu mensaje a escala de fachada.' },
  { id: 'carteles', name: 'Carteles', tech: eco, note: 'Para el frente del local y la calle.' },
  { id: 'letras', name: 'Letras corpóreas', tech: eco, note: 'Tu marca con volumen real.' },
  { id: 'banner', name: 'Banner', tech: eco, note: 'Lona impresa para eventos, ferias y promociones.' },
  { id: 'plotter', name: 'Plotter', tech: eco, note: 'Corte de vinilo adhesivo para vidrieras y superficies lisas.' },
  { id: 'flyers', name: 'Flyers', tech: extra, note: 'Para repartir de mano en mano.' },
  { id: 'rollo', name: 'Rollo a rollo', tech: uv, note: 'Impresión UV continua sobre material flexible.' },
  { id: 'cama', name: 'Cama plana', tech: uv, note: 'Impresión UV directa sobre planchas rígidas.' },
  { id: 'pvc', name: 'PVC', tech: uv, note: 'Plancha rígida, también en alto impacto.' },
  { id: 'coroplast', name: 'Coroplast', tech: uv, note: 'Plástico corrugado y liviano.' },
  { id: 'acrilico', name: 'Acrílico', tech: uv, note: 'Acabado brillante para interiores y recepciones.' },
]

export const TICKER_ITEMS = [
  'Carteles',
  'Letras corpóreas',
  'Gigantografías',
  'Banner',
  'Plotter',
  'Flyers',
  'Rollo a rollo',
  'Cama plana',
  'PVC alto impacto',
  'Coroplast',
  'Acrílico',
]

export const PRINT_STEPS = [
  { plate: 'C', color: 'var(--cyan)', title: 'La idea', text: 'Medidas, material y lugar donde va a estar. Con eso se empieza.' },
  { plate: 'M', color: 'var(--magenta)', title: 'El archivo', text: 'Se revisa el diseño y se prepara para imprimir sin sorpresas.' },
  { plate: 'Y', color: 'var(--yellow)', title: 'La impresión', text: 'Solvente, eco solvente 1440 o UV, según el material y el uso que va a tener.' },
  { plate: 'K', color: 'var(--silver)', title: 'La terminación', text: 'Cortado, revisado y listo para su lugar.' },
]

export const MATERIALS = [
  { id: 'gigantografia', name: 'Gigantografía', note: 'Gran formato con ojales' },
  { id: 'pvc', name: 'PVC', note: 'Plancha rígida' },
  { id: 'coroplast', name: 'Coroplast', note: 'Corrugado y liviano' },
  { id: 'acrilico', name: 'Acrílico', note: 'Brillante, con separadores' },
]

export const SIGN_COLORS = [
  { id: 'ink', name: 'Tinta', bg: 'var(--ink)', fg: 'var(--paper)' },
  { id: 'cyan', name: 'Cian', bg: 'var(--cyan)', fg: 'var(--sheet)' },
  { id: 'magenta', name: 'Magenta', bg: 'var(--magenta)', fg: 'var(--sheet)' },
  { id: 'yellow', name: 'Amarillo', bg: 'var(--yellow)', fg: 'var(--ink-deep)' },
]
