/**
 * Mapa central de rutas equivalentes ES↔EN.
 * Fuente única para navegación, enlazado interno y alternates hreflang.
 * La clave es estable; cada idioma tiene su slug propio (contenido NO duplicado).
 */

export type Locale = 'es' | 'en';

export type RouteKey =
  | 'home'
  | 'services'
  | 'breakfasts'
  | 'lunches'
  | 'dinners'
  | 'serviceEvents'
  | 'experience'
  | 'zoneIbiza'
  | 'zoneBarcelona'
  | 'zoneMallorca'
  | 'pastEvents'
  | 'about'
  | 'testimonials'
  | 'menus'
  | 'contact'
  | 'faq'
  | 'legalNotice'
  | 'privacy'
  | 'cookies'
  | 'blog';

export const ROUTES: Record<RouteKey, Record<Locale, string>> = {
  home: { es: '/', en: '/en/' },
  services: { es: '/servicios/', en: '/en/services/' },
  breakfasts: { es: '/servicios/desayunos/', en: '/en/services/breakfast/' },
  lunches: { es: '/servicios/comidas/', en: '/en/services/lunch/' },
  dinners: { es: '/servicios/cenas-privadas/', en: '/en/services/private-dinners/' },
  serviceEvents: { es: '/servicios/eventos/', en: '/en/services/events/' },
  experience: {
    es: '/servicios/experiencia-gastronomica/',
    en: '/en/services/private-chef-experience/',
  },
  zoneIbiza: { es: '/chef-privado-ibiza/', en: '/en/private-chef-ibiza/' },
  zoneBarcelona: { es: '/chef-privado-barcelona/', en: '/en/private-chef-barcelona/' },
  zoneMallorca: { es: '/chef-privado-mallorca/', en: '/en/private-chef-mallorca/' },
  pastEvents: { es: '/eventos-realizados/', en: '/en/past-events/' },
  about: { es: '/sobre-jenn/', en: '/en/about-jenn/' },
  testimonials: { es: '/testimonios/', en: '/en/testimonials/' },
  menus: { es: '/menus/', en: '/en/menus/' },
  contact: { es: '/contacto/', en: '/en/contact/' },
  faq: { es: '/faq/', en: '/en/faq/' },
  legalNotice: { es: '/aviso-legal/', en: '/en/legal-notice/' },
  privacy: { es: '/privacidad/', en: '/en/privacy/' },
  cookies: { es: '/cookies/', en: '/en/cookies/' },
  blog: { es: '/blog/', en: '/en/blog/' },
};

/** Ruta localizada de una clave. */
export function route(key: RouteKey, lang: Locale): string {
  return ROUTES[key][lang];
}
