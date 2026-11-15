# Inventario de recursos (derechos de autor e imagen)

> Borrador técnico, **no** es una opinión legal. Lo debe validar el responsable de la iglesia.
> "Pendiente" = no se pudo verificar desde el código; hace falta confirmarlo con la persona que creó o entregó el recurso.

## Fotos y logo (`public/`)

| Archivo | Dónde se ve | Qué muestra (resumen) | Autor / licencia de la foto | Permiso de imagen de las personas |
|---|---|---|---|---|
| `foto1.jpg` | Galería («Ministerio Infantil y Adolescentes») | Grupo grande al aire libre con el texto «Ministerio Infantil y Adolescentes». Rostros identificables; **podría incluir menores** | Pendiente (sin datos EXIF) | **Pendiente — prioridad alta** (si hay menores: autorización de madre/padre o acudiente) |
| `foto2.jpg` | Galería («Predicación de la Palabra») | Predicador en el púlpito; en la pantalla se lee un versículo | Pendiente | Pendiente (persona identificable) |
| `foto3.jpg` | Galería («Celebraciones») | Grupo de mujeres con un pastel; rostros identificables; edades no verificables | Pendiente | **Pendiente — prioridad alta** si alguna es menor |
| `foto4.jpg` | Galería («Culto Principal») | Culto visto desde atrás; personas de espaldas, puede haber niños | Pendiente | Pendiente (bajo riesgo: casi nadie identificable) |
| `foto5.jpg` | Galería («Alabanza y Palabra») | Predicadora y músico en el altar; en la pantalla se lee «Romanos 12:2 DHH» | Pendiente | Pendiente (personas identificables) |
| `foto6.jpg` | Galería («Nuestra Congregación») | Culto visto desde atrás | Pendiente | Pendiente (bajo riesgo) |
| `logo-iglesia.jpg` | Encabezado, inicio, pie, favicon, imagen al compartir | Logo de la iglesia | Pendiente: confirmar quién lo diseñó y que la iglesia puede usarlo | No aplica |

Notas:
- **Licencia de la foto ≠ permiso de las personas.** Aunque la foto sea de la iglesia, cada persona reconocible (sobre todo menores) debe haber aceptado aparecer en la web.
- Los títulos de la galería se ajustaron para que describan lo que muestra cada foto.
- `foto2` y `foto5` muestran en una pantalla textos bíblicos (Romanos 12:2 en la traducción Dios Habla Hoy, de Sociedades Bíblicas Unidas). Es un uso incidental dentro de la foto, de bajo riesgo, pero queda anotado.
- Ninguna foto trae datos EXIF (no hay ubicación GPS ni autor incrustados).

### Cómo retirar o sustituir una foto
1. Reemplaza el archivo en `public/` por otro con **el mismo nombre** (ej. `foto1.jpg`), o
2. Quita su bloque en la lista `galleryImages` de `src/app/components/GallerySection.tsx`.
3. Haz commit y push: Vercel crea un despliegue nuevo. Las versiones antiguas pueden quedar en cachés de redes sociales por un tiempo.

## Fuentes, íconos y código

| Recurso | Uso | Licencia |
|---|---|---|
| Inter y Playfair Display (Google Fonts vía `next/font`) | Tipografía | SIL Open Font License 1.1 (se descargan al compilar; los visitantes no se conectan a Google Fonts) |
| `lucide-react` | Íconos (teléfono, correo, Facebook, Instagram, etc.) | ISC |
| Íconos SVG de TikTok y WhatsApp escritos a mano en el código | Botones de redes | Procedencia **pendiente**; son marcas registradas de sus dueños, se usan solo para enlazar |
| Next.js, React, embla-carousel, nodemailer | Código | MIT / MIT-0 según cada paquete |
| Mapa de Google Maps (iframe) | Sección Ubicación | Términos de Google Maps; Google puede recibir datos del navegador al cargarlo |

## Textos
- No se encontraron citas bíblicas copiadas en los textos del sitio.
- No hay videos ni música en el sitio.
- Textos propios de la iglesia: confirmar autoría (normalmente no hay problema).
- `src/app/components/Gallery.tsx` no se usa en la página y apunta a imágenes que no existen (`/images/gallery*.jpg`). No afecta al público; se puede borrar más adelante.
