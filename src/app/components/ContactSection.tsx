'use client';

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";

export default function ContactSection() {
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
        }),
        });

        if (res.ok) {
        setSent(true);
        form.reset();
        } else {
        const data = await res.json();
        setError(data.error || "Hubo un problema al enviar.");
        }

        setLoading(false);
};

    return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold font-playfair mb-6">Contáctanos</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Estamos aquí para ti. No dudes en contactarnos para cualquier consulta, oración o si deseas conocer más
                sobre nuestra comunidad.
            </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
                <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-3 rounded-lg flex-shrink-0">
                    <Phone className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Teléfono</h3>
                    <p className="opacity-90">+57 323 763 8113</p>
                    <p className="text-sm opacity-75">Disponible de Lunes a Viernes</p>
                </div>
                </div>

                <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-lg flex-shrink-0">
                    <Mail className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Email</h3>
                    <p className="opacity-90">feyesperanzagalicia@gmail.com</p>
                    <p className="text-sm opacity-75">Respuesta en 24 horas</p>
                </div>
                </div>

                <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-green-500 to-teal-600 p-3 rounded-lg flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Dirección</h3>
                    <p className="opacity-90">Esperanza Galicia</p>
                    <p className="text-sm opacity-75">Cra 15#153-42 Galicia</p>
                </div>
                </div>

                <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-lg flex-shrink-0">
                    <Clock className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Horarios de Oficina</h3>
                    <p className="opacity-90">Lunes - Viernes: 9:00 AM - 6:00 PM</p>
                    <p className="opacity-90">Sábados: 10:00 AM - 2:00 PM</p>
                </div>
                </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <h3 className="text-2xl font-bold font-playfair mb-6">Envíanos un Mensaje</h3>
                {sent ? (
                <p className="text-green-400 font-medium">Tu mensaje fue enviado exitosamente. ¡Gracias!</p>
                ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                    <label className="block text-sm font-medium mb-2">Nombre Completo</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="Tu nombre"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder="tu@email.com"
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium mb-2">Mensaje</label>
                    <textarea
                        name="message"
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                        placeholder="¿En qué podemos ayudarte?"
                    ></textarea>
                    </div>

                    {error && <p className="text-red-300 text-sm">{error}</p>}

                    <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                    {loading ? "Enviando..." : "Enviar Mensaje"}
                    </button>
                </form>
                )}
            </div>
            </div>

            <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold font-playfair mb-6">Síguenos en Redes Sociales</h3>
            <div className="flex justify-center gap-6">
                <a
                href="https://www.facebook.com/feyesperanzagaliciaoficial?locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-500 p-4 rounded-full transition-colors duration-300 hover:scale-110 transform"
                >
                <Facebook className="w-6 h-6" />
                </a>
                <a
                href="https://www.instagram.com/fe_y_esperanza_galicia/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 p-4 rounded-full transition-all duration-300 hover:scale-110 transform"
                >
                <Instagram className="w-6 h-6" />
                </a>
                <a
                href="https://www.tiktok.com/@iglesia.fe.y.espe1?_t=ZS-8wxTPpPW9nU&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black hover:bg-gray-800 p-4 rounded-full transition-colors duration-300 hover:scale-110 transform"
                >
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
                </a>
            </div>
            <p className="text-gray-300 mt-4">Mantente conectado con nuestra comunidad</p>
            </div>
        </div>
    </section>
    );
}
