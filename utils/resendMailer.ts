import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY!);

interface MailPayload {
  to: string;
  subject: string;
  html: string;
}

/**
 * Envía un correo electrónico mediante la API de Resend.
 * Mantiene la interfaz sencilla y tipada.
 */
export const sendEmail = async ({ to, subject, html }: MailPayload): Promise<void> => {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'Spa Sentirse Bien <no-reply@resend.dev>',
    to,
    subject,
    html,
  });
}; 