# educapanama-web

Sitio web de **EducaPanamá** (educapanama.net): representante en Panamá de **EduPage** (gestión escolar) y **aSc Horarios**, con capacitación y soporte local.

Sitio estático (HTML, CSS, JS) — sin dependencias ni build. Se despliega en Cloudflare.

## Páginas

- `index.html` — Inicio
- `edupage.html` — EduPage (gestión escolar, boletines con QR)
- `asc-horarios.html` — aSc Horarios (horarios automáticos)
- `clientes.html` — Instituciones que usan las soluciones
- `servicios.html` — Capacitación, soporte y videoconferencias
- `contacto.html` — Formulario de contacto
- `landing-demo.html` — Landing de conversión para anuncios
- `privacidad.html` — Aviso de privacidad

## Notas

- Los formularios (contacto y landing) registran el lead en **Mautic** (`mkt.educapanama.net`, formId 2) y abren **WhatsApp** con el mensaje armado.
- Contacto/ventas por WhatsApp: **+507 6330-4392**.
