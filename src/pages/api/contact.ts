import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const phone = (data.get('phone') as string) || 'Nie podano';
    const message = data.get('message') as string;

    // Validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          message: 'Brakujące wymagane pola.',
        }),
        { status: 400 }
      );
    }

    // SMTP Configuration from environment variables
    const smtpHost = import.meta.env.SMTP_HOST || process.env.SMTP_HOST;
    const smtpPort = import.meta.env.SMTP_PORT || process.env.SMTP_PORT;
    const smtpUser = import.meta.env.SMTP_USER || process.env.SMTP_USER;
    const smtpPass = import.meta.env.SMTP_PASS || process.env.SMTP_PASS;
    const targetEmail = import.meta.env.CONTACT_TARGET_EMAIL || process.env.CONTACT_TARGET_EMAIL;

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !targetEmail) {
      throw new Error(`Brakujące zmienne środowiskowe: HOST=${!!smtpHost}, PORT=${!!smtpPort}, USER=${!!smtpUser}, PASS=${!!smtpPass}, TARGET=${!!targetEmail}`);
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: parseInt(smtpPort) === 465, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Email content
    const mailOptions = {
      from: smtpUser,
      to: targetEmail,
      replyTo: email as string,
      subject: `Nowa wiadomość od ${name} | Next Level Energy`,
      text: `Wiadomość z formularza kontaktowego:\n\nImię: ${name}\nE-mail: ${email}\nTelefon: ${phone}\n\nWiadomość:\n${message}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #a213da;">Nowa wiadomość z formularza</h2>
          <p><strong>Imię:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p><strong>Treść wiadomości:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="font-size: 0.8rem; color: #777;">Wiadomość wysłana z formularza na stronie Next Level Energy.</p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({
        message: 'Wiadomość została wysłana pomyślnie!',
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Nodemailer error:', error);
    return new Response(
      JSON.stringify({
        message: 'Wystąpił błąd podczas wysyłania wiadomości.',
        errorDetail: error?.message || String(error)
      }),
      { status: 500 }
    );
  }
};
