# Redirecciones 301 — migración SEO de almamia.es

La web previa de `almamia.es` tiene URLs ya indexadas. Para no perder posicionamiento,
cada URL antigua con tráfico o enlaces debe redirigir con **301** a su equivalente nueva.
Las redirecciones se configuran en **`vercel.json`** (clave `redirects`).

> ⚠️ En el momento de crear este proyecto, `almamia.es` **no respondía** (timeout), por lo
> que no se pudo extraer su mapa de URLs automáticamente. Hay que obtenerlo (paso 1) y
> rellenar `vercel.json` (paso 3).

## Paso 1 — Obtener las URLs antiguas

Usa una de estas fuentes (idealmente todas):

- **Google Search Console** → *Páginas* / *Rendimiento* → exporta las URLs indexadas.
- **Sitemap antiguo:** `https://almamia.es/sitemap.xml` o `/sitemap_index.xml` (cuando la web responda).
- **Crawl** con Screaming Frog (gratis hasta 500 URLs) del dominio actual.
- `https://almamia.es/robots.txt` (suele apuntar al sitemap).

## Paso 2 — Mapear antigua → nueva

URLs NUEVAS de este sitio (destinos disponibles):

| Sección | ES | EN |
|---|---|---|
| Inicio | `/` | `/en/` |
| Servicios | `/servicios/` | `/en/services/` |
| Desayunos | `/servicios/desayunos/` | `/en/services/breakfast/` |
| Comidas | `/servicios/comidas/` | `/en/services/lunch/` |
| Cenas privadas | `/servicios/cenas-privadas/` | `/en/services/private-dinners/` |
| Eventos (servicio) | `/servicios/eventos/` | `/en/services/events/` |
| Experiencia | `/servicios/experiencia-gastronomica/` | `/en/services/private-chef-experience/` |
| Chef privado Ibiza | `/chef-privado-ibiza/` | `/en/private-chef-ibiza/` |
| Chef privado Barcelona | `/chef-privado-barcelona/` | `/en/private-chef-barcelona/` |
| Chef privado Mallorca | `/chef-privado-mallorca/` | `/en/private-chef-mallorca/` |
| Eventos realizados | `/eventos-realizados/` | `/en/past-events/` |
| Sobre Jenn | `/sobre-jenn/` | `/en/about-jenn/` |
| Testimonios | `/testimonios/` | `/en/testimonials/` |
| Menús | `/menus/` | `/en/menus/` |
| Contacto | `/contacto/` | `/en/contact/` |
| FAQ | `/faq/` | `/en/faq/` |
| Aviso legal | `/aviso-legal/` | `/en/legal-notice/` |
| Privacidad | `/privacidad/` | `/en/privacy/` |
| Cookies | `/cookies/` | `/en/cookies/` |
| Blog | `/blog/` | `/en/blog/` |

## Paso 3 — Rellenar `vercel.json`

Añade cada par dentro de `"redirects"`. Plantilla:

```json
{
  "redirects": [
    { "source": "/ruta-antigua", "destination": "/servicios/cenas-privadas/", "permanent": true },
    { "source": "/old-page", "destination": "/en/services/private-dinners/", "permanent": true }
  ]
}
```

- `"permanent": true` = **301** (transfiere autoridad SEO). Usa 302 solo para algo temporal.
- Para patrones con comodín: `"source": "/blog/:slug"`, `"destination": "/blog/:slug/"`.

## Paso 4 — Antes y después de publicar

- [ ] No dejar URLs antiguas con tráfico devolviendo 404.
- [ ] Desplegar y comprobar cada 301 (`curl -I https://almamia.es/ruta-antigua`).
- [ ] Reenviar el sitemap nuevo en Search Console y solicitar indexación de las páginas clave.
- [ ] Vigilar *Cobertura* / errores de rastreo las primeras semanas.

> Cuando tengas el listado de URLs antiguas (o la web vuelva a estar online), puedo
> generar el bloque `redirects` completo automáticamente.
