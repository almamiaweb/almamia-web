/**
 * Genera imágenes PLACEHOLDER (no son fotos reales) para exhibir el pipeline
 * de <Image>/<Picture> de Astro (Sharp → AVIF/WebP) y dar layout real.
 * Cada imagen lleva el rótulo "imagen pendiente" para que sea inequívoco.
 *
 * Reemplazar por las fotos reales de Jenn cuando estén disponibles
 * (ver README → checklist de contenido).
 *
 * Uso: node scripts/gen-placeholders.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const ASSETS = join(root, 'src', 'assets', 'placeholders');
const OG = join(root, 'public', 'og');

const PALETTE = [
  { bg: '#EFE7DA', fg: '#5F6E50', accent: '#C9A24E' },
  { bg: '#E6E1D2', fg: '#4F5C42', accent: '#9CAE8E' },
  { bg: '#E9E4DC', fg: '#5F6E50', accent: '#C7BFD4' },
  { bg: '#F0EADF', fg: '#4F5C42', accent: '#C9A24E' },
];

function svg(w, h, label, tone) {
  const { bg, fg, accent } = tone;
  const titleSize = Math.round(Math.min(w, h) * 0.06);
  const subSize = Math.round(Math.min(w, h) * 0.028);
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <g opacity="0.5">
    <circle cx="${w * 0.5}" cy="${h * 0.4}" r="${Math.min(w, h) * 0.16}" fill="none" stroke="${accent}" stroke-width="2"/>
    <line x1="${w * 0.5 - 40}" y1="${h * 0.62}" x2="${w * 0.5 + 40}" y2="${h * 0.62}" stroke="${accent}" stroke-width="3"/>
  </g>
  <text x="50%" y="${h * 0.5}" text-anchor="middle" font-family="Georgia, serif"
        font-size="${titleSize}" fill="${fg}" font-style="italic">Alma Mía</text>
  <text x="50%" y="${h * 0.5 + titleSize * 0.95}" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="${subSize}" letter-spacing="4"
        fill="${fg}" opacity="0.75">${label}</text>
</svg>`);
}

const IMAGES = [
  // Hero y secciones de inicio
  { name: 'hero', w: 1800, h: 2100, label: 'IMAGEN PENDIENTE' },
  { name: 'philosophy', w: 1400, h: 1100, label: 'IMAGEN PENDIENTE' },
  { name: 'jenn-portrait', w: 1200, h: 1500, label: 'RETRATO PENDIENTE' },
  // Servicios
  { name: 'service-breakfast', w: 1400, h: 1050, label: 'IMAGEN PENDIENTE' },
  { name: 'service-lunch', w: 1400, h: 1050, label: 'IMAGEN PENDIENTE' },
  { name: 'service-dinner', w: 1400, h: 1050, label: 'IMAGEN PENDIENTE' },
  { name: 'service-events', w: 1400, h: 1050, label: 'IMAGEN PENDIENTE' },
  { name: 'service-experience', w: 1400, h: 1050, label: 'IMAGEN PENDIENTE' },
  // Zonas
  { name: 'zone-ibiza', w: 1800, h: 1150, label: 'IMAGEN PENDIENTE' },
  { name: 'zone-barcelona', w: 1800, h: 1150, label: 'IMAGEN PENDIENTE' },
  { name: 'zone-mallorca', w: 1800, h: 1150, label: 'IMAGEN PENDIENTE' },
  // Eventos realizados
  { name: 'event-1', w: 1400, h: 1050, label: 'IMAGEN PENDIENTE' },
  { name: 'event-2', w: 1400, h: 1050, label: 'IMAGEN PENDIENTE' },
  { name: 'event-3', w: 1400, h: 1050, label: 'IMAGEN PENDIENTE' },
  { name: 'event-4', w: 1400, h: 1050, label: 'IMAGEN PENDIENTE' },
  // Menús
  { name: 'menu-mediterraneo', w: 1400, h: 1050, label: 'IMAGEN PENDIENTE' },
  { name: 'menu-brunch', w: 1400, h: 1050, label: 'IMAGEN PENDIENTE' },
  { name: 'menu-degustacion', w: 1400, h: 1050, label: 'IMAGEN PENDIENTE' },
  // Blog
  { name: 'blog-1', w: 1600, h: 1000, label: 'IMAGEN PENDIENTE' },
];

async function run() {
  await mkdir(ASSETS, { recursive: true });
  await mkdir(OG, { recursive: true });

  for (let i = 0; i < IMAGES.length; i++) {
    const img = IMAGES[i];
    const tone = PALETTE[i % PALETTE.length];
    const buf = svg(img.w, img.h, img.label, tone);
    await sharp(buf)
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(join(ASSETS, `${img.name}.jpg`));
    process.stdout.write(`· ${img.name}.jpg\n`);
  }

  // Imagen Open Graph por defecto (1200x630) en /public para URL absoluta.
  await sharp(svg(1200, 630, 'CHEF PRIVADA · IBIZA', PALETTE[0]))
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(OG, 'og-default.jpg'));
  process.stdout.write('· public/og/og-default.jpg\n');

  process.stdout.write(`\n${IMAGES.length + 1} placeholders generados.\n`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
