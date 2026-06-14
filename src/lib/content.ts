import { getCollection } from 'astro:content';
import type { Locale } from '@i18n/routes';

/** Eventos realizados de un idioma, ordenados por `order`. */
export async function getEventos(lang: Locale) {
  const all = await getCollection('eventos', (e) => e.data.lang === lang);
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Testimonios de un idioma, ordenados por `order`. */
export async function getTestimonios(lang: Locale) {
  const all = await getCollection('testimonios', (t) => t.data.lang === lang);
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Menús de ejemplo de un idioma, ordenados por `order`. */
export async function getMenus(lang: Locale) {
  const all = await getCollection('menus', (m) => m.data.lang === lang);
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Posts de blog de un idioma (excluye borradores), por fecha descendente. */
export async function getBlogPosts(lang: Locale) {
  const all = await getCollection('blog', (p) => p.data.lang === lang && !p.data.draft);
  return all.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}
