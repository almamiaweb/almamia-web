// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// URL canónica de producción. Cambiar solo si el dominio definitivo difiere.
const SITE = 'https://almamia.es';

// https://astro.build/config
export default defineConfig({
  site: SITE,

  // Estático por defecto (SSG). Solo /api/contact opta a render on-demand
  // mediante `export const prerender = false` en su propio archivo.
  output: 'static',
  adapter: vercel({
    // Analítica de Vercel sin cookies (no requiere banner de consentimiento).
    webAnalytics: { enabled: true },
  }),

  // i18n nativo de Astro: español en la raíz, inglés bajo /en/.
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'ca', 'en', 'de', 'it'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  // API nativa de fuentes de Astro 6 (sin paquetes @fontsource manuales).
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Fraunces',
      cssVariable: '--ff-display',
      weights: [400, 500, 600],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      display: 'swap',
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Hanken Grotesk',
      cssVariable: '--ff-body',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      display: 'swap',
    },
  ],

  // Content Security Policy de Astro 6 (hashes automáticos de scripts/estilos
  // propios). Solo añadimos las directivas externas necesarias para la
  // analítica de Vercel. GTM/GA4 vía Partytown se documentan en el README.
  security: {
    csp: {
      // CSP limpia: solo el propio sitio (Astro añade los hashes de scripts/
      // estilos propios automáticamente) + la analítica de Vercel.
      // 'frame-ancestors' se omite (se ignora en <meta>); el anticlickjacking
      // lo da X-Frame-Options: DENY (cabecera HTTP en vercel.json).
      // No se permite vercel.live: su toolbar mete estilos inline incompatibles
      // con la CSP; se desactiva el Toolbar en Vercel en su lugar.
      directives: [
        "default-src 'self'",
        "img-src 'self' data: https:",
        "font-src 'self' data:",
        "connect-src 'self' https://*.vercel-insights.com https://vitals.vercel-insights.com",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
      ],
    },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-ES', en: 'en-US' },
      },
    }),
    mdx(),
    // Carga GTM/terceros fuera del hilo principal (slots documentados, sin claves).
    partytown({ config: { forward: ['dataLayer.push', 'gtag'] } }),
  ],

  image: {
    // Servicio Sharp (AVIF/WebP, srcset responsive). Por defecto en Astro.
    responsiveStyles: true,
  },

  markdown: {
    // Prism usa clases + hoja de estilos (self) → compatible con CSP.
    // Shiki inyecta estilos inline que la CSP bloquearía.
    syntaxHighlight: 'prism',
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
