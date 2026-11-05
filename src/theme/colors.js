/**
 * Única fuente de verdad de los colores.
 *
 * Para crear un tema: agrega un objeto a `themes` con las mismas claves y cambia
 * `ACTIVE_THEME`, o bien aplica `<html data-theme="nombre">` para cambiarlo en vivo.
 * Tailwind expone cada clave como clase: `ink-deep` -> `bg-ink-deep`, `text-ink-deep`...
 * Ver el mapeo en src/index.css.
 */
export const themes = {
  // Colores tomados de la foto del cartel del local.
  cartel: {
    'ink-deep': '#0a1620', // sombra del panel
    ink: '#12222f', // fondo del panel del cartel
    'ink-raised': '#1b3041', // superficies sobre el panel
    line: '#2f4759', // filetes y bordes
    paper: '#eef2f4', // texto blanco del cartel
    sheet: '#ffffff', // papel de impresión
    silver: '#c3ced4', // metal del logo
    'silver-dark': '#7e909b', // sombra del metal
    muted: '#a3b4bf', // texto secundario
    cyan: '#1490d8', // esquirla C del logo
    magenta: '#d92a68', // esquirla M del logo
    yellow: '#e2cd1f', // esquirla Y del logo
    key: '#10151a', // esquirla K del logo
  },
}

export const ACTIVE_THEME = 'cartel'

const toDeclarations = (theme) =>
  Object.entries(theme)
    .map(([token, value]) => `--${token}:${value}`)
    .join(';')

/** Genera el CSS de todos los temas. Vite lo inyecta en index.html al compilar. */
export function themesToCss() {
  const active = `:root{${toDeclarations(themes[ACTIVE_THEME])}}`
  const named = Object.entries(themes).map(
    ([name, theme]) => `[data-theme="${name}"]{${toDeclarations(theme)}}`,
  )
  return [active, ...named].join('')
}
