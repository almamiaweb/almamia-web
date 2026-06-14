import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// Zod desde astro/zod (requisito Astro 6).
import { z } from 'astro/zod';

const localeField = z.enum(['es', 'en']);

/** Blog (arquitectura lista; 1 post de ejemplo; aún sin enlazar en el menú). */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      lang: localeField,
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      heroAlt: z.string().default(''),
      author: z.string().default('Jenn Garrido Umaña'),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

/** Eventos realizados: foto + título + breve historia + tipo + zona. */
const eventos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/eventos' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      story: z.string(),
      type: z.string(),
      zona: z.string(),
      lang: localeField,
      image: image(),
      imageAlt: z.string(),
      date: z.coerce.date().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(0),
    }),
});

/** Testimonios (1 ejemplo [PENDIENTE]; no inventar reseñas). */
const testimonios = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/testimonios' }),
  schema: z.object({
    author: z.string(),
    location: z.string().optional(),
    text: z.string(),
    rating: z.number().min(1).max(5).optional(),
    service: z.string().optional(),
    lang: localeField,
    pending: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

/** Menús de ejemplo (permitir adjuntar PDF más adelante). */
const menus = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/menus' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      lang: localeField,
      image: image().optional(),
      imageAlt: z.string().default(''),
      courses: z
        .array(
          z.object({
            section: z.string(),
            items: z.array(z.string()),
          })
        )
        .default([]),
      priceNote: z.string().optional(),
      pdf: z.string().optional(),
      order: z.number().default(0),
    }),
});

export const collections = { blog, eventos, testimonios, menus };
