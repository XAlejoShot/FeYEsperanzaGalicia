# Guía de lanzamiento — Fe y Esperanza Galicia (Vercel)

Esta guía explica qué se cambió, cómo configurar las cuentas y cómo publicar **sin riesgos**.
Nada se ha publicado ni se ha enviado ningún correo real.

---

## 1. Cómo funciona el formulario (explicado simple)

```
Visitante llena el formulario
        │  (el navegador solo envía nombre, correo, mensaje y la casilla)
        ▼
/api/contact  (servidor en Vercel)
  1. Revisa que todo esté bien (largo, formato, casilla marcada, filtro antispam)
  2. Entra a Gmail con la contraseña de aplicación (guardada en Vercel, nunca en el código)
  3. Envía el correo:  De: cuenta de la iglesia → Para: Feyesperanzagalicia@gmail.com
                       Responder a: el correo del visitante
        ▼
Gmail de la iglesia
```

- El destino en **Production** está fijo en el código: `Feyesperanzagalicia@gmail.com`. Nadie puede cambiarlo desde el navegador.
- En **Preview** y en tu computador se usa `EMAIL_TO`, para probar sin tocar producción.
- El correo del visitante va solo en **Reply-To** (al darle "Responder" en Gmail le contestas a él).
- El sitio **no guarda** los mensajes. Quedan únicamente en el Gmail de la iglesia.
- Gmail gratuito permite unos 500 destinatarios al día; para un formulario de iglesia es más que suficiente.

---

## 2. Crear la contraseña de aplicación de Gmail (cuenta de la iglesia)

1. Inicia sesión en Google con **Feyesperanzagalicia@gmail.com**.
2. Ve a https://myaccount.google.com/security y activa **Verificación en 2 pasos** (si no está activa).
3. Ve a https://myaccount.google.com/apppasswords
4. Escribe un nombre, por ejemplo `Sitio web Vercel`, y pulsa **Crear**.
5. Google muestra 16 letras. **Cópialas y pégalas directamente en Vercel** (paso 3). No las pegues en chats, correos ni en Git.

> ⚠️ La contraseña normal de la cuenta **no sirve** para el sitio (Google la rechaza por SMTP) y **no debe** guardarse en ningún archivo ni variable. Como se compartió en un chat, cámbiala primero (myaccount.google.com → Seguridad → Contraseña) y **después** crea la contraseña de aplicación.

> Si cambian la contraseña normal de la cuenta, Google anula esta contraseña de aplicación y el formulario deja de enviar. Habría que crear una nueva y actualizarla en Vercel.

**Prueba local (opcional):** el archivo `.env.local` de tu computador ya tiene las variables, pero el valor de `EMAIL_PASS` parece un texto de ejemplo (no lo leímos ni lo mostramos). Si quieres probar con Gmail real desde tu PC, reemplázalo tú mismo por la contraseña de aplicación.

---

## 3. Configurar Vercel

1. En https://vercel.com → **Add New… → Project** → importa este repositorio.
   Vercel detecta **Next.js** solo. No cambies los comandos (`npm install` / `npm run build`).
2. **Settings → Environment Variables** y agrega:

| Variable | Valor | Production | Preview | Marcar "Sensitive" |
|---|---|---|---|---|
| `EMAIL_USER` | `Feyesperanzagalicia@gmail.com` | ✅ | ✅ | opcional |
| `EMAIL_PASS` | la contraseña de aplicación (16 letras) | ✅ | ✅ | ✅ **sí** |
| `EMAIL_TO` | correo donde quieres recibir las **pruebas** (puede ser el de la iglesia) | — (se ignora) | ✅ | no |
| `NEXT_PUBLIC_SITE_URL` | `https://tu-dominio` **solo si** la iglesia tiene dominio propio | ✅ | — | no |

   - **No** crees `SMTP_TEST_HOST` ni `SMTP_TEST_PORT` en Vercel (son solo para las pruebas automáticas).
   - Después de cambiar una variable hay que **volver a desplegar** (Deployments → ⋮ → Redeploy).
3. **Decisión tomada:** no habrá dominio propio por ahora. Se usará la dirección `*.vercel.app` que asigna Vercel; el sitio la toma automáticamente para la vista previa al compartir. No hace falta `NEXT_PUBLIC_SITE_URL`.

---

## 4. Probar en Preview (antes de producción)

1. Sube tus cambios a una **rama distinta de `main`** (ej. `git checkout -b lanzamiento` → `git push -u origin lanzamiento`). Vercel crea un despliegue *Preview*.
2. Abre el enlace de Preview y revisa:
   - [ ] Se ve bien en celular y computador.
   - [ ] Al compartir el enlace en WhatsApp aparece la imagen con el logo.
   - [ ] El favicon (ícono de la pestaña) es el logo.
   - [ ] Formulario vacío → muestra errores en español.
   - [ ] Formulario correcto (espera unos segundos antes de enviar) → "¡Mensaje enviado!".
   - [ ] **Abrir el Gmail de `EMAIL_TO`** y confirmar que llegó (revisa también *Spam*). Esto solo se puede comprobar abriendo Gmail.
   - [ ] En Gmail, pulsar **Responder**: debe salir el correo del visitante.
   - [ ] El enlace "aviso de privacidad" abre `/privacidad`.
3. Si algo falla, mira la sección 6.

---

## 5. Publicar en producción

Cuando Preview funcione y los pendientes de la sección 8 estén resueltos: une la rama a `main` (Pull Request → Merge). Vercel publica solo. Haz **un envío real de prueba** y confirma en el Gmail de la iglesia.

---

## 6. Revisar errores sin ver mensajes privados

El servidor **nunca** escribe en los logs el nombre, correo ni texto del visitante. Solo deja estas líneas:

| Línea en el log | Qué significa | Qué hacer |
|---|---|---|
| `[contact] mensaje aceptado por el servidor de correo` | Gmail aceptó el envío | Si no aparece en la bandeja, revisa *Spam* |
| `[contact] faltan variables de entorno` | Falta `EMAIL_USER`, `EMAIL_PASS` o `EMAIL_TO` (indica cuál con `true/false`) | Agregar la variable y redeploy |
| `[contact] error al enviar { code: 'EAUTH' ... }` | Contraseña de aplicación incorrecta o anulada | Crear una nueva (sección 2) |
| `... code: 'ETIMEDOUT' / 'ESOCKET' / 'ECONNECTION'` | No se pudo conectar con Gmail | Reintentar; si persiste, revisar estado de Gmail |
| `... responseCode: 550` | Gmail rechazó (por ejemplo, límite diario) | Esperar 24 h |
| `[contact] rechazado: filtro antispam` / `demasiados envíos seguidos` | Robot o muchos envíos seguidos | Normal, no hacer nada |

Dónde verlo: Vercel → proyecto → **Logs** → filtrar por ruta `/api/contact`.
En el plan gratuito (Hobby) los logs se guardan solo **1 hora**: revísalos justo después de la prueba.

Nunca agregues `console.log` del contenido del formulario para "depurar".

---

## 7. Volver a un despliegue anterior

- **Rápido:** Vercel → proyecto → tarjeta *Production Deployment* → **Instant Rollback** → elegir el anterior → confirmar. En el plan Hobby solo se puede volver al despliegue **inmediatamente anterior**.
- Tras un rollback, Vercel deja de asignar producción automáticamente. Cuando arregles el problema, usa **Promote** (o "Undo Rollback") en el despliegue bueno.
- **Por Git:** `git revert <commit>` y `git push` → Vercel crea un despliegue nuevo sin el cambio.

---

## 8. Pendientes que BLOQUEAN el lanzamiento

1. **Contraseña de aplicación real** creada y guardada en Vercel (sección 2 y 3).
2. **Aviso de privacidad** (`src/app/privacidad/page.tsx`): completar todo lo marcado `[POR CONFIRMAR]` (nombre legal, NIT, dirección de notificaciones, quién lee el correo, tiempo de conservación, fecha) y que lo apruebe el responsable de la iglesia. Hoy la página muestra esas marcas en amarillo.
3. **Peticiones de oración — decisión tomada: se siguen recibiendo.** Como son *datos sensibles* (Ley 1581 de 2012), el formulario ya pide autorización expresa (casilla sin marcar) y avisa que compartirlas es opcional. Falta definir en el aviso de privacidad **quiénes** pueden leer el correo de la iglesia y **cuánto tiempo** se guardan los mensajes.
4. **Permiso de imagen** de las personas en `foto1.jpg` (dice "Ministerio Infantil y Adolescentes", posibles menores) y `foto3.jpg`. Si no hay autorización, sustituir o retirar la foto (ver `docs/inventario-recursos.md`).
5. **Prueba real en Preview** y confirmación en Gmail (sección 4).

### Recomendado (no bloquea)
- Confirmar la promesa "Respuesta en 24 horas" de la tarjeta Email.
- Si se consigue dominio propio: agregarlo en Vercel → Domains y poner `NEXT_PUBLIC_SITE_URL`.
- Para más protección antispam: reglas del **Firewall de Vercel** para `/api/contact`, si el plan lo permite. El límite de 5 envíos cada 10 minutos por IP del código funciona por instancia, no es global.
- Borrar `src/app/components/Gallery.tsx` (no se usa y apunta a imágenes inexistentes).

---

## 9. Comandos (en tu computador)

Las dependencias cambiaron, así que primero ejecuta **`npm install`**.

```bash
npm install            # instala las versiones nuevas
npm run lint           # revisión de código
npm run build          # compila como en Vercel
npm run test:contact   # pruebas del formulario con un Gmail SIMULADO (no envía correos)
npm run dev            # ver el sitio en http://localhost:3000
```

La sección 6 de `test:contact` necesita Node 22.18 o superior; con una versión menor solo se omite.
