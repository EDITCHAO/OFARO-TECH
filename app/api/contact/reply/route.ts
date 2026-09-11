import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, clientName, subject, reply } = body;

    // Validation
    if (!to || !reply) {
      return NextResponse.json(
        { error: 'Email destinataire et message sont obligatoires' },
        { status: 400 }
      );
    }

    // Note: Cette implémentation est un placeholder
    // Vous devrez intégrer un service d'envoi d'emails comme:
    // - Resend
    // - SendGrid
    // - AWS SES
    // - Nodemailer

    // Exemple avec Resend (à adapter selon votre service):
    /*
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'OFARO TECH <contact@ofaro-tech.com>',
      to: [to],
      subject: `Re: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #f97316;">OFARO TECH - Réponse à votre message</h2>
          <p>Bonjour ${clientName},</p>
          <p style="white-space: pre-wrap;">${reply}</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
          <p style="color: #6b7280; font-size: 14px;">
            OFARO TECH<br />
            Email: contact@ofaro-tech.com<br />
            Web: https://ofaro-tech.com
          </p>
        </div>
      `
    });
    */

    // Pour l'instant, retournons un succès simulé
    console.log('📧 Email à envoyer:', {
      from: 'contact@ofaro-tech.com',
      to,
      subject: `Re: ${subject}`,
      reply
    });

    // TODO: Intégrer un vrai service d'envoi d'emails
    // Pour l'instant, on simule l'envoi
    return NextResponse.json({
      success: true,
      message: `Email envoyé à ${to}`
    });

  } catch (error) {
    console.error('Erreur envoi email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
}
