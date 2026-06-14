import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Render on-demand (serverless en Vercel). El resto del sitio es estático.
export const prerender = false;

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  zone?: string;
  service?: string;
  date?: string;
  guests?: string;
  message?: string;
  consent?: string;
  /** Honeypot: debe llegar vacío. */
  company?: string;
}

const json = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const isEmail = (v: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const escapeHtml = (v: string): string =>
  v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export const POST: APIRoute = async ({ request }) => {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  // Honeypot: si viene relleno, lo tratamos como spam (respuesta OK silenciosa).
  if (body.company && body.company.trim() !== '') {
    return json({ ok: true });
  }

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim();
  const message = (body.message ?? '').trim();

  if (!name || !email || !message || !body.consent) {
    return json({ ok: false, error: 'missing_fields' }, 422);
  }
  if (!isEmail(email)) {
    return json({ ok: false, error: 'invalid_email' }, 422);
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const toEmail = import.meta.env.CONTACT_TO_EMAIL;
  // Remitente verificado en Resend. Fallback a onboarding mientras se configura el dominio.
  const fromEmail = import.meta.env.CONTACT_FROM_EMAIL || 'Alma Mía <onboarding@resend.dev>';

  if (!apiKey || !toEmail) {
    // No hay configuración de envío: informamos sin filtrar detalles.
    return json({ ok: false, error: 'email_not_configured' }, 500);
  }

  const resend = new Resend(apiKey);

  const rows: [string, string | undefined][] = [
    ['Nombre', name],
    ['Email', email],
    ['Teléfono', body.phone],
    ['Zona', body.zone],
    ['Servicio', body.service],
    ['Fecha', body.date],
    ['Comensales', body.guests],
  ];

  const html = `
    <h2>Nueva solicitud desde almamia.es</h2>
    <table style="border-collapse:collapse;font-family:sans-serif">
      ${rows
        .filter(([, v]) => v && v.trim() !== '')
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 12px 4px 0;color:#6f665c">${k}</td><td style="padding:4px 0"><strong>${escapeHtml(
              v as string
            )}</strong></td></tr>`
        )
        .join('')}
    </table>
    <p style="font-family:sans-serif"><strong>Mensaje:</strong></p>
    <p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(message)}</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Nueva solicitud de ${name} — Alma Mía`,
      html,
    });
    if (error) {
      return json({ ok: false, error: 'send_failed' }, 502);
    }
    return json({ ok: true });
  } catch {
    return json({ ok: false, error: 'send_failed' }, 502);
  }
};
