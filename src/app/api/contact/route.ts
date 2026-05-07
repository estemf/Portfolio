import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides." }, { status: 400 });
  }

  const { name, email, message } = parsed.data;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!to || !from) {
    return NextResponse.json({ error: "Configuration manquante." }, { status: 500 });
  }

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `[Portfolio] Message de ${name}`,
      text: `Nom : ${name}\nEmail : ${email}\n\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <p style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#756c61;margin-bottom:24px">Portfolio — nouveau message</p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            <tr>
              <td style="padding:8px 0;color:#756c61;font-size:12px;width:80px">Nom</td>
              <td style="padding:8px 0;font-weight:600">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#756c61;font-size:12px">Email</td>
              <td style="padding:8px 0"><a href="mailto:${email}" style="color:#d2502a">${email}</a></td>
            </tr>
          </table>
          <div style="background:#f5f0e8;border-radius:12px;padding:20px;white-space:pre-wrap;line-height:1.6">${message}</div>
        </div>
      `,
    });
  } catch (err) {
    console.error("[smtp]", err);
    return NextResponse.json({ error: "Envoi échoué." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
