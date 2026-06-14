# Alma Mía — web de chef privada

Web profesional de **Alma Mía**, el servicio de chef privada de **Jenn Garrido Umaña**:
cocina mediterránea saludable y experiencias gastronómicas a domicilio en **Ibiza** (base),
**Barcelona** y **Mallorca** (cobertura también en Formentera).

Construida desde cero, optimizada para **SEO, rendimiento (Core Web Vitals), accesibilidad
(WCAG 2.2 AA) y conversión**, bilingüe **ES/EN**.

> ⚠️ Este proyecto **no hereda nada** de la web previa del dominio. Antes de publicar,
> lee la sección **[Migración SEO](#-migración-seo-importante)**.

---

## 🧱 Stack

| Pieza | Tecnología |
|---|---|
| Framework | **Astro 6** (TypeScript `strict`/`strictest`) |
| Estilos | **Tailwind CSS v4** (CSS-first con `@theme`, vía `@tailwindcss/vite`) |
| Fuentes | API nativa de fuentes de Astro 6 (`fontProviders.fontsource()`) — Fraunces + Hanken Grotesk |
| Contenido | Content Collections (Zod desde `astro/zod`) + MDX |
| Imágenes | `<Image>`/`<Picture>` (Sharp) → AVIF/WebP, `srcset` responsive |
| Despliegue | Adaptador `@astrojs/vercel` (estático + 1 función serverless para el formulario) |
| Terceros | `@astrojs/partytown` (GTM/GA4 fuera del hilo principal) |
| Seguridad | CSP de Astro 6 (`security.csp`, hashes automáticos de scripts/estilos) |
| Analítica | Vercel Web Analytics + Speed Insights (sin cookies) |

---

## ✅ Requisitos

- **Node.js 22.12.0 o superior** (requisito de Astro 6). Comprueba con `node --version`.
  Si necesitas actualizarlo: descarga la LTS desde <https://nodejs.org> o usa `nvm`.

## ▶️ Comandos

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo  → http://localhost:4321
npm run build      # build de producción (genera dist/ y .vercel/output/)
npm run check      # validación TypeScript de Astro (debe dar 0 errores)
```

> **Nota sobre `npm run preview`:** el adaptador de Vercel **no** soporta `astro preview`.
> Para previsualizar en local usa `npm run dev`, o despliega un *Preview* en Vercel.

### Regenerar imágenes placeholder

Las imágenes actuales son **placeholders** generados (no son fotos reales). Para regenerarlas:

```bash
node scripts/gen-placeholders.mjs
```

Sustitúyelas por las fotos reales en `src/assets/placeholders/` (mismos nombres de archivo)
y vuelve a hacer `npm run build`.

---

## 📁 Estructura

```
src/
├─ assets/placeholders/   # imágenes (placeholder → reemplazar por fotos reales)
├─ components/            # SEO, Header, Footer, WhatsApp, Faq, tarjetas, formulario…
├─ content/               # colecciones: blog, eventos, testimonios, menus (ES + EN)
├─ i18n/                  # routes.ts (mapa ES↔EN + hreflang) y ui.ts (traducciones)
├─ layouts/               # BaseLayout, ServicePageLayout, ZonePageLayout, LegalLayout
├─ lib/                   # site.ts (datos del negocio), schema.ts (JSON-LD), content.ts
├─ pages/                 # páginas ES en la raíz; EN bajo /en/; API en /api/contact.ts
├─ styles/global.css      # sistema de diseño (tokens @theme, utilidades)
└─ content.config.ts      # esquemas de colecciones (Zod)
public/                   # favicon, robots.txt, llms.txt, og/og-default.jpg
scripts/gen-placeholders.mjs
```

### Datos del negocio centralizados

Todo lo editable del negocio vive en **`src/lib/site.ts`**: marca, contacto, redes,
zonas, datos fiscales. Cambiar un valor ahí se propaga a SEO, JSON-LD, footer y legales.

---

## 🔐 Variables de entorno

Copia `.env.example` a `.env` (local) y configúralas en **Vercel → Settings → Environment
Variables** (producción). Resumen:

- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` → formulario de contacto.
- `PUBLIC_GOOGLE_SITE_VERIFICATION`, `PUBLIC_BING_SITE_VERIFICATION` → verificación.
- `PUBLIC_GTM_ID` / `PUBLIC_GA4_ID` / `PUBLIC_META_PIXEL_ID` / `PUBLIC_GOOGLE_ADS_ID` →
  analítica/Ads (opcionales, ver más abajo).

---

## 🌍 i18n

- Español en la raíz (`/`), inglés bajo `/en/`.
- Slugs propios por idioma (contenido **no duplicado**): ej. `/servicios/cenas-privadas/`
  ↔ `/en/services/private-dinners/`.
- `hreflang` (`es`, `en`, `x-default`) generado automáticamente en todas las páginas desde
  el mapa central `src/i18n/routes.ts`.

---

## 🔎 SEO técnico, GEO/AEO

- Componente `<SEO>` reutilizable: title, description, canonical, Open Graph (imagen propia),
  Twitter Card, hreflang.
- **JSON-LD**: `LocalBusiness` tipo `Caterer` (inicio + contacto), `Person` (sobre Jenn),
  `Service` (cada servicio y zona), `FAQPage` (donde hay FAQs), `BreadcrumbList`, `Article` (blog).
  Los campos sin datos reales (teléfono, email) se **omiten** del schema hasta rellenarlos en
  `site.ts` (no se publican placeholders inválidos).
- `@astrojs/sitemap` (`/sitemap-index.xml`) + `robots.txt` (permite indexación).
- **GEO/AEO**: cada página abre con una respuesta directa (≤40 palabras) y FAQs en lenguaje
  real de cliente. Se incluye **`/llms.txt`** con el resumen del negocio.

### IndexNow (opcional)

Para notificar cambios a Bing/Yandex puedes añadir la integración
[`astro-indexnow`](https://github.com/Yan-Thomas/astro-indexnow) o `@indexnow/astro`:

```bash
npm install astro-indexnow
```

Genera una clave (GUID), guárdala en `INDEXNOW_KEY`, coloca el archivo `<clave>.txt` en
`public/` y añade la integración en `astro.config.mjs`. Se ha dejado la variable
`INDEXNOW_KEY` en `.env.example` lista para usar.

---

## 📈 Analítica y CSP

- **Activa por defecto:** Vercel Web Analytics + Speed Insights → **no usan cookies**, por lo
  que **no requieren banner de consentimiento**.
- **Opcional (desactivado):** GTM, GA4, píxel de Meta y Google Ads vía Partytown. Solo se
  cargan si defines su variable de entorno (`PUBLIC_GTM_ID`, etc.).
  - ⚠️ Estas herramientas **usan cookies**: antes de activarlas necesitas un **banner de
    consentimiento (Consent Mode v2)**.
  - ⚠️ También deberás **añadir sus dominios a la CSP** en `astro.config.mjs`
    (`security.csp.directives`): p. ej. `script-src`/`img-src`/`connect-src` de
    `https://www.googletagmanager.com`, `https://*.google-analytics.com`,
    `https://connect.facebook.net`, etc.
- La CSP de Astro genera hashes automáticos para los scripts y estilos propios. El sitio **no
  usa atributos `style=""` inline** (incompatibles con CSP); todo el estilo va por clases.
  Si algún script de terceros se bloqueara y no lograras ajustar la política, documenta el
  caso y, como último recurso, desactiva temporalmente la CSP (`security.csp: false`) con un
  `TODO` antes que entregar scripts rotos.

---

## 📋 Checklist de contenido real (lo que debe aportar el cliente)

Todo lo marcado con `[PENDIENTE]` en el código necesita datos reales. **No se ha inventado
nada** (ni reseñas, ni precios, ni teléfonos, ni afirmaciones).

- [ ] **Teléfono** propio de Jenn (NO usar ninguno de Take a Chef) → `src/lib/site.ts` (`CONTACT.phone`)
- [ ] **Número de WhatsApp** (formato internacional) → `CONTACT.whatsapp`
- [ ] **Email** definitivo → `CONTACT.email`
- [ ] **URL exacta del perfil de Take a Chef** → `SOCIAL.takeachef` (para `sameAs`)
- [ ] **Datos fiscales** (razón social, NIF/NIE, dirección) → `LEGAL` (aviso legal y privacidad)
- [ ] **Precios** por servicio → menús (`priceNote`) y, si procede, ajustar `PRICE_RANGE`
- [ ] **Reseñas reales** (autorizadas) → `src/content/testimonios/` (sustituir el ejemplo)
- [ ] **Fotos reales** → `src/assets/placeholders/` (hero, retrato de Jenn, servicios, zonas,
      eventos, menús, blog) y `public/og/og-default.jpg`
- [ ] **Eventos reales** (foto + historia, sin clientes/fechas inventados) → `src/content/eventos/`
- [ ] **Verificación** de Google Search Console y Bing → variables `PUBLIC_*_VERIFICATION`

---

## 🚀 Despliegue en Vercel + dominio almamia.es

1. Sube el repositorio a GitHub/GitLab.
2. En **Vercel → New Project**, importa el repo. Vercel detecta Astro automáticamente
   (framework preset *Astro*; el adaptador ya está configurado).
3. Configura las **variables de entorno** (ver `.env.example`).
4. *Deploy*. La home y todas las páginas se sirven estáticas; `/api/contact` corre como
   función serverless.
5. **Dominio:** Vercel → Project → *Settings → Domains* → añade `almamia.es` (y `www`).
   Sigue las instrucciones de DNS de Vercel (registro A/CNAME). Configura la redirección
   `www → apex` (o viceversa) según prefieras.
6. Verifica `https://almamia.es/sitemap-index.xml` y `https://almamia.es/robots.txt`.

---

## 🔁 Migración SEO (IMPORTANTE)

El dominio `almamia.es` ya tiene una web previa con URLs **indexadas**. Antes de publicar
esta nueva versión:

1. **Audita las URLs antiguas indexadas** en **Google Search Console** (Cobertura/Páginas) y
   con un *crawl* (Screaming Frog o similar) del sitio actual.
2. **Mapea** cada URL antigua a su equivalente nueva (ver `src/i18n/routes.ts`).
3. **Crea redirecciones 301** de las URLs antiguas a las nuevas. En Vercel puedes hacerlo con
   un `vercel.json` (`"redirects": [{ "source": "/ruta-vieja", "destination": "/ruta-nueva",
   "permanent": true }]`). Crea ese archivo con el mapeo real antes de publicar.
4. **No dejes URLs antiguas devolviendo 404** si tenían tráfico o enlaces.
5. Tras publicar: reenvía el **sitemap** en Search Console y solicita indexación de las
   páginas clave. Vigila errores de rastreo las primeras semanas.

---

## ♿ Accesibilidad y rendimiento

- HTML semántico, navegación por teclado, foco visible, `skip link`, contraste WCAG 2.2 AA
  verificado (texto carbón / acciones en oliva-oscuro sobre crema).
- `prefers-reduced-motion` respetado en todas las animaciones.
- Hero con `loading="eager"` + `fetchpriority="high"`; resto `lazy`. Sin *layout shift*
  (dimensiones explícitas en imágenes, fuentes con `display: swap`).
