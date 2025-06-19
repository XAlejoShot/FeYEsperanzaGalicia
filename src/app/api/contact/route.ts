export const dynamic = "force-dynamic";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    const data = await req.json();

    const { name, email, message } = data;

    if (!name || !email || !message) {
        return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
    }

    // Configura tu cuenta de correo (Gmail)
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
        from: process.env.EMAIL_USER,         // 👈 el remitente autorizado
        to: process.env.EMAIL_TO,             // 👈 tu correo destino
        replyTo: email,                       // 👈 para poder responder al remitente real
        subject: `Nuevo mensaje de ${name}`,
        text: `
    📥 Has recibido un nuevo mensaje desde el formulario de contacto.

    👤 Nombre: ${name}
    📧 Correo: ${email}

    📝 Mensaje:
    ${message}
        `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error enviando correo:", error);
        return NextResponse.json({ error: "Error al enviar" }, { status: 500 });
    }
}
