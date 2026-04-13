import { ContactForm } from "@/types/contact";
import { NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY!;

export async function sendContactEmail(data: ContactForm) {
  const { message, name, email } = data;

  const html = `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br>")}</p>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL!,
      to: [process.env.RESEND_TO_EMAIL!],
      subject: "New Contact",
      html,
      reply_to: email,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return Response.json(data);
  }

  return NextResponse.json(
    { error: "Failed to send email", details: await response.text() },
    { status: 500 },
  );
}
