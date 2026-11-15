import type { Metadata } from "next"
import Link from "next/link"

/*
 * BORRADOR — debe revisarlo y aprobarlo el responsable de la iglesia antes de publicar.
 * Todo lo marcado como [POR CONFIRMAR] debe completarse con datos reales.
 */

export const metadata: Metadata = {
  title: "Aviso de privacidad | Fe y Esperanza Galicia",
  description: "Cómo trata Fe y Esperanza Galicia los datos que envías por el formulario de contacto.",
}

const Pending = ({ children }: { children: React.ReactNode }) => (
  <mark className="bg-amber-100 text-amber-900 px-1 rounded">[POR CONFIRMAR: {children}]</mark>
)

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <article className="max-w-3xl mx-auto px-6 text-slate-700 leading-relaxed space-y-6 text-[15px]">
        <p>
          <Link href="/" className="text-violet-700 underline hover:text-violet-900">← Volver al inicio</Link>
        </p>

        <h1 className="font-playfair text-3xl lg:text-4xl font-extrabold text-slate-900">
          Aviso de privacidad del formulario de contacto
        </h1>
        <p className="text-sm text-slate-500">
          Última actualización: <Pending>fecha de aprobación</Pending>
        </p>

        <section className="space-y-2">
          <h2 className="font-playfair text-xl font-bold text-slate-900">1. ¿Quién es el responsable de tus datos?</h2>
          <p>
            <Pending>nombre legal completo de la iglesia</Pending>, conocida como «Fe y Esperanza Galicia»,
            identificada con NIT <Pending>NIT</Pending>, con domicilio en <Pending>dirección de notificaciones</Pending>,
            Pereira, Risaralda, Colombia.
          </p>
          <p>
            Contacto para temas de datos personales:{" "}
            <a href="mailto:feyesperanzagalicia@gmail.com" className="text-violet-700 underline">feyesperanzagalicia@gmail.com</a>{" "}
            · Teléfono +57 323 763 8113.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-playfair text-xl font-bold text-slate-900">2. ¿Qué datos pedimos y para qué?</h2>
          <p>
            En el formulario pedimos solo tu <strong>nombre</strong>, tu <strong>correo electrónico</strong> y el
            <strong> mensaje</strong> que quieras escribir. Los usamos únicamente para leer tu mensaje y responderte.
          </p>
          <p>No usamos estos datos para enviarte publicidad, no los vendemos y no los publicamos.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-playfair text-xl font-bold text-slate-900">3. Información sensible (opcional)</h2>
          <p>
            Si en tu mensaje compartes peticiones de oración, creencias religiosas, temas de salud u otra información
            sensible, lo haces de forma <strong>voluntaria</strong>: no estás obligado a darla y puedes escribirnos
            sin incluirla. Solo la leerá el equipo de la iglesia encargado de responder
            (<Pending>quiénes tienen acceso al correo de la iglesia</Pending>) y no la compartiremos con otras personas
            sin tu permiso.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-playfair text-xl font-bold text-slate-900">4. Niñas, niños y adolescentes</h2>
          <p>
            El formulario está pensado para personas mayores de 18 años. Si eres menor de edad, pide a tu mamá, papá
            o acudiente que nos escriba.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-playfair text-xl font-bold text-slate-900">5. ¿Dónde se guardan tus datos y quién nos ayuda?</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Vercel Inc.</strong> aloja este sitio web y procesa el envío del formulario. El sitio no guarda
              tu mensaje en una base de datos.
            </li>
            <li>
              <strong>Google LLC (Gmail)</strong>: tu mensaje se envía y queda guardado en la cuenta de correo de la iglesia.
            </li>
          </ul>
          <p>
            Estos proveedores pueden tener servidores fuera de Colombia (por ejemplo, en Estados Unidos).
          </p>
          <p>
            La sección «Ubicación» muestra un mapa de Google Maps. Al cargarlo, Google puede recibir datos técnicos de tu
            navegador según sus propias políticas. Este sitio no instala herramientas de analítica ni publicidad.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-playfair text-xl font-bold text-slate-900">6. ¿Por cuánto tiempo los guardamos?</h2>
          <p>
            Guardaremos tus mensajes durante <Pending>plazo de conservación definido por la iglesia</Pending> y luego
            los borraremos, salvo que la ley nos obligue a conservarlos.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-playfair text-xl font-bold text-slate-900">7. Tus derechos</h2>
          <p>
            Según la Ley 1581 de 2012 puedes: conocer, actualizar y corregir tus datos; pedir prueba de tu autorización;
            saber cómo los usamos; pedir que los borremos o revocar tu autorización; y presentar quejas ante la
            Superintendencia de Industria y Comercio (SIC) después de haber acudido a nosotros.
          </p>
          <p>
            Para ejercerlos, escribe a{" "}
            <a href="mailto:feyesperanzagalicia@gmail.com" className="text-violet-700 underline">feyesperanzagalicia@gmail.com</a>{" "}
            indicando tu nombre, el correo con el que nos escribiste y lo que necesitas. Responderemos dentro de los
            plazos de ley <Pending>confirmar plazos y procedimiento interno con el responsable</Pending>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-playfair text-xl font-bold text-slate-900">8. Política completa</h2>
          <p>
            Este aviso resume nuestra política de tratamiento de datos personales: <Pending>enlace o forma de consultar la política completa</Pending>.
          </p>
        </section>
      </article>
    </main>
  )
}
