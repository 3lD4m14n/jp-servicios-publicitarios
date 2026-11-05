# JP Servicios Publicitarios: prototipo

React + Vite + Tailwind CSS v4. Sitio estático, sin backend.

```bash
npm install
npm run dev     # desarrollo
npm run build   # genera dist/
```

## Dónde cambiar cada cosa

- **Colores y temas:** `src/theme/colors.js`. Para crear un tema, agrega un objeto con las mismas claves a
  `themes` y cambia `ACTIVE_THEME`, o aplica `<html data-theme="nombre">` en vivo.
- **Datos de la empresa y catálogo:** `src/data/business.js`. Los campos en `null` aparecen como "Por confirmar".
- **Logo:** `src/components/Logo.jsx` es una recreación hecha a partir de la foto; reemplazar por el vector original.

## Antes de publicar de verdad

- Completar teléfono, dirección y horario, y confirmar los textos del catálogo y del proceso.
- Quitar `<meta name="robots" content="noindex">` de `index.html`.
- Quitar la nota "Prototipo" del pie en `src/components/Contact.jsx`.

## Despliegue actual

Amplify Hosting, Región `us-east-2`, despliegue manual sin Git: rama `jp` de la app `gastos-ocr` (`d2yjry2chsdf2y`).
La cuenta no permitió crear una segunda app. Las cabeceras HTTP y las reglas de reescritura son las de esa app.

Para actualizar: `npm run build`, comprimir el contenido de `dist/` (no la carpeta) en un `.zip`, llamar a
`CreateDeployment` para la rama `jp`, subir el `.zip` con PUT a `zipUploadUrl` y llamar a `StartDeployment`.
