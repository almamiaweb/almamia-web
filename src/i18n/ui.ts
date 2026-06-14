/**
 * Diccionario de cadenas de interfaz (chrome): navegación, footer, formularios,
 * CTAs y etiquetas comunes. La copy larga de cada página vive en la propia página.
 */
import type { Locale } from './routes';

export const UI = {
  es: {
    'nav.services': 'Servicios',
    'nav.zones': 'Zonas',
    'nav.about': 'Sobre Jenn',
    'nav.events': 'Eventos realizados',
    'nav.menus': 'Menús',
    'nav.testimonials': 'Testimonios',
    'nav.faq': 'Preguntas frecuentes',
    'nav.contact': 'Contacto',
    'nav.menu': 'Menú',
    'nav.close': 'Cerrar',

    'cta.reserve': 'Reserva tu experiencia',
    'cta.contact': 'Contactar',
    'cta.whatsapp': 'Escríbeme por WhatsApp',
    'cta.viewServices': 'Ver servicios',
    'cta.viewAll': 'Ver todo',
    'cta.discover': 'Descubrir',
    'cta.readMore': 'Saber más',

    'lang.switch': 'English',
    'lang.label': 'Cambiar idioma',

    'footer.tagline': 'Cocina privada que nutre el cuerpo y el alma.',
    'footer.nav': 'Navegación',
    'footer.zones': 'Zonas de servicio',
    'footer.legal': 'Legal',
    'footer.contact': 'Contacto',
    'footer.follow': 'Sígueme',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.builtFor': 'Chef privada con base en Ibiza · Disponible para desplazarse.',

    'form.name': 'Nombre',
    'form.email': 'Correo electrónico',
    'form.phone': 'Teléfono (opcional)',
    'form.zone': 'Zona del evento',
    'form.date': 'Fecha aproximada (opcional)',
    'form.guests': 'Nº de comensales (opcional)',
    'form.service': 'Servicio de interés',
    'form.message': 'Cuéntame tu idea',
    'form.send': 'Enviar solicitud',
    'form.sending': 'Enviando…',
    'form.success': 'Gracias. He recibido tu mensaje y te responderé muy pronto.',
    'form.error': 'No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme por WhatsApp.',
    'form.required': 'Este campo es obligatorio.',
    'form.invalidEmail': 'Introduce un correo electrónico válido.',
    'form.consent':
      'He leído y acepto la política de privacidad y el tratamiento de mis datos para gestionar mi solicitud.',
    'form.selectOption': 'Selecciona una opción',

    'breadcrumb.home': 'Inicio',
    'common.skipToContent': 'Saltar al contenido',
    'common.faqTitle': 'Preguntas frecuentes',
    'common.relatedServices': 'Servicios relacionados',
    'common.relatedZones': 'Dónde trabajo',
  },
  en: {
    'nav.services': 'Services',
    'nav.zones': 'Areas',
    'nav.about': 'About Jenn',
    'nav.events': 'Past events',
    'nav.menus': 'Menus',
    'nav.testimonials': 'Testimonials',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.close': 'Close',

    'cta.reserve': 'Book your experience',
    'cta.contact': 'Get in touch',
    'cta.whatsapp': 'Message me on WhatsApp',
    'cta.viewServices': 'View services',
    'cta.viewAll': 'View all',
    'cta.discover': 'Discover',
    'cta.readMore': 'Learn more',

    'lang.switch': 'Español',
    'lang.label': 'Change language',

    'footer.tagline': 'Private cuisine that nourishes body and soul.',
    'footer.nav': 'Navigation',
    'footer.zones': 'Service areas',
    'footer.legal': 'Legal',
    'footer.contact': 'Contact',
    'footer.follow': 'Follow me',
    'footer.rights': 'All rights reserved.',
    'footer.builtFor': 'Private chef based in Ibiza · Available to travel.',

    'form.name': 'Name',
    'form.email': 'Email',
    'form.phone': 'Phone (optional)',
    'form.zone': 'Event area',
    'form.date': 'Approximate date (optional)',
    'form.guests': 'Number of guests (optional)',
    'form.service': 'Service of interest',
    'form.message': 'Tell me about your idea',
    'form.send': 'Send request',
    'form.sending': 'Sending…',
    'form.success': 'Thank you. I have received your message and will reply very soon.',
    'form.error': 'Your message could not be sent. Please try again or message me on WhatsApp.',
    'form.required': 'This field is required.',
    'form.invalidEmail': 'Please enter a valid email address.',
    'form.consent':
      'I have read and accept the privacy policy and the processing of my data to handle my request.',
    'form.selectOption': 'Select an option',

    'breadcrumb.home': 'Home',
    'common.skipToContent': 'Skip to content',
    'common.faqTitle': 'Frequently asked questions',
    'common.relatedServices': 'Related services',
    'common.relatedZones': 'Where I work',
  },
} as const;

export type UIKey = keyof (typeof UI)['es'];

/** Devuelve una función de traducción para el idioma dado. */
export function useTranslations(lang: Locale) {
  return function t(key: UIKey): string {
    return UI[lang][key] ?? UI.es[key];
  };
}
