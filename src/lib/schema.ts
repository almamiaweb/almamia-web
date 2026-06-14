/**
 * Constructores de datos estructurados (JSON-LD).
 * Los campos con valor PENDIENTE se OMITEN (no se emiten placeholders inválidos
 * a los buscadores). Rellenar CONTACT/LEGAL en site.ts los activa.
 */
import {
  SITE,
  CHEF,
  CONTACT,
  PENDIENTE,
  PRICE_RANGE,
  AREAS_SERVED,
  sameAsList,
} from './site';
import type { Locale } from '@i18n/routes';

type Json = Record<string, unknown>;

/** Elimina claves undefined/null/vacías de un objeto JSON-LD. */
function clean<T extends Json>(obj: T): T {
  const out: Json = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === '') continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = v;
  }
  return out as T;
}

const abs = (path: string): string =>
  new URL(path, SITE.url).href.replace(/(?<!:)\/\//g, '/');

/** Negocio local tipo Caterer (inicio y contacto). */
export function localBusinessSchema(lang: Locale, ogImage: string): Json {
  const desc =
    lang === 'es'
      ? 'Alma Mía es el servicio de chef privada de Jenn Garrido Umaña: cocina mediterránea saludable y experiencias gastronómicas a domicilio en Ibiza, Barcelona y Mallorca.'
      : 'Alma Mía is the private chef service of Jenn Garrido Umaña: wholesome Mediterranean cuisine and private dining experiences in Ibiza, Barcelona and Mallorca.';

  return clean({
    '@context': 'https://schema.org',
    '@type': 'Caterer',
    '@id': `${SITE.url}/#business`,
    name: SITE.brand,
    description: desc,
    url: SITE.url,
    image: abs(ogImage),
    telephone: CONTACT.phone === PENDIENTE ? undefined : CONTACT.phone,
    email: CONTACT.email === PENDIENTE ? undefined : CONTACT.email,
    priceRange: PRICE_RANGE,
    servesCuisine: ['Mediterránea', 'Saludable', 'Repostería saludable'],
    areaServed: AREAS_SERVED.map((name) => ({ '@type': 'City', name })),
    knowsLanguage: ['es', 'en'],
    founder: {
      '@type': 'Person',
      name: CHEF.name,
      jobTitle: 'Chef',
    },
    sameAs: sameAsList(),
  });
}

/** Persona (E-E-A-T) para la página Sobre Jenn. */
export function personSchema(): Json {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE.url}/#jenn`,
    name: CHEF.name,
    jobTitle: 'Chef privada',
    nationality: 'Colombiana',
    worksFor: { '@id': `${SITE.url}/#business` },
    sameAs: sameAsList(),
  });
}

/** Servicio concreto. */
export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  image: string;
}): Json {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: abs(opts.url),
    image: abs(opts.image),
    provider: { '@id': `${SITE.url}/#business` },
    areaServed: AREAS_SERVED.map((name) => ({ '@type': 'City', name })),
  });
}

/** FAQPage a partir de pares pregunta/respuesta. */
export function faqSchema(items: { q: string; a: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

/** Migas de pan. `items` en orden jerárquico. */
export function breadcrumbSchema(items: { name: string; url: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.url),
    })),
  };
}

/** Artículo de blog. */
export function articleSchema(opts: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string | undefined;
  author?: string | undefined;
}): Json {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url: abs(opts.url),
    image: abs(opts.image),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { '@type': 'Person', name: opts.author ?? CHEF.name },
    publisher: { '@id': `${SITE.url}/#business` },
    mainEntityOfPage: abs(opts.url),
  });
}
