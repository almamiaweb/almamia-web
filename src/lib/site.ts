/**
 * Datos centralizados del negocio Alma Mía.
 * Todo dato real no verificable está marcado con PENDIENTE para no inventar.
 * Editar aquí propaga a SEO, JSON-LD, footer, contacto y legales.
 */

/** Marcador de dato pendiente de aportar por el cliente. */
export const PENDIENTE = '[PENDIENTE]';

export const SITE = {
  brand: 'Alma Mía',
  domain: 'almamia.es',
  url: 'https://almamia.es',
  /** Año de creación de la marca (dato real aportado). */
  foundedYear: 2024,
  /** Base de operaciones. */
  baseCity: 'Ibiza',
} as const;

/** Chef / fundadora. */
export const CHEF = {
  name: 'Jenn Garrido Umaña',
  jobTitle: 'Chef privada',
  nationality: 'Colombia',
  yearsExperience: 10,
} as const;

/**
 * Datos de contacto. Teléfono, WhatsApp y email son PENDIENTE:
 * NO usar ningún número de Take a Chef ni inventar.
 */
export const CONTACT: { phone: string; whatsapp: string; email: string } = {
  // Teléfono propio de Jenn — pendiente de aportar (NO usar el de Take a Chef; no inventar).
  phone: PENDIENTE,
  // WhatsApp en formato internacional sin signos para wa.me cuando se aporte.
  whatsapp: PENDIENTE,
  // Email de contacto del proyecto (cuenta real de Alma Mía).
  email: 'almamiaweb@gmail.com',
};

/**
 * Perfiles externos para `sameAs` (E-E-A-T / entidad).
 * takeachef se deja vacío hasta tener la URL exacta del perfil de Jenn.
 */
export const SOCIAL: {
  instagram: string;
  instagramHandle: string;
  takeachef: string;
} = {
  instagram: 'https://www.instagram.com/alma.mia.es/',
  instagramHandle: '@alma.mia.es',
  // Perfil de Jenn en Take a Chef (dato real, para sameAs / E-E-A-T).
  takeachef: 'https://www.takeachef.com/chef/jenn-garrido-umana',
};

/** Indicador cualitativo de rango de precio (Schema.org, no es un precio real). */
export const PRICE_RANGE = '€€€';

/** Zonas de servicio. La principal es Ibiza. */
export const AREAS_SERVED = ['Ibiza', 'Formentera', 'Barcelona', 'Mallorca'] as const;

/**
 * Datos fiscales para páginas legales (LSSI-CE / RGPD).
 * Pendientes de aportar: razón social, NIF y dirección.
 */
export const LEGAL: { titularName: string; nif: string; address: string } = {
  titularName: PENDIENTE,
  nif: PENDIENTE,
  address: PENDIENTE,
};

/** Construye el enlace wa.me con mensaje prerrellenado (si hay número). */
export function whatsappLink(message?: string): string {
  const base = CONTACT.whatsapp === PENDIENTE ? '' : CONTACT.whatsapp.replace(/\D/g, '');
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  // Si no hay número aún, devolvemos un ancla inerte para no romper enlaces.
  return base ? `https://wa.me/${base}${text}` : '#contacto';
}

/** Lista de perfiles no vacíos para sameAs en JSON-LD. */
export function sameAsList(): string[] {
  return [SOCIAL.instagram, SOCIAL.takeachef].filter((u): u is string => Boolean(u));
}
