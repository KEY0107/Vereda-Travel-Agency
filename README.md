# Vereda — Agencia de Viajes

Landing page para una agencia de viajes desarrollada como prueba técnica para la vacante de Front-End Developer.

---

## Instalación y ejecución

**Requisitos previos:** Node.js 18+ y npm.

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd app

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

```bash
# Generar build de producción
npm run build
npm start
```

---

## Decisiones de diseño

### Identidad de marca

El nombre **Vereda** evoca un camino propio, íntimo y descubierto a pie — una metáfora directa para el turismo personalizado. La identidad visual se construyó sobre tres valores: confianza, calidez e inspiración.

- **Paleta de color:** verde bosque profundo (`#2D4A3E`) como color primario, con fondos en tonos arena cálida (`#F5F1EA`, `#FFFDF9`). Esta combinación transmite naturaleza y sofisticación sin caer en los clichés del azul turístico genérico.
- **Tipografía:** Playfair Display para encabezados (elegancia editorial) combinada con la tipografía del sistema para cuerpo de texto (legibilidad y rendimiento).
- **Dark mode:** los fondos oscuros usan verdes profundos (`#121816`, `#1D2623`) que mantienen la coherencia de marca en lugar de recurrir a grises genéricos.

### Estructura de la página

Las secciones siguen el flujo natural de un embudo de conversión:

1. **Navbar** — orientación y acceso rápido a cualquier sección
2. **Hero** — impacto emocional inmediato con parallax
3. **SearchBar** — primera intención de búsqueda (punto de acción temprano)
4. **Paquetes** — propuesta de valor concreta con filtros por tipo
5. **Destinos** — inspiración visual mediante carrusel interactivo
6. **FAQ** — resolución de objeciones antes del interés
7. **Opiniones** — prueba social para reforzar la confianza
8. **Nosotros** — credibilidad y diferenciación de marca
9. **Cotizador** — acción de conversión principal *(punto extra)*
10. **Contacto** — cierre del embudo con formulario simulado
11. **Footer** — información institucional y acceso rápido

### Sistema de componentes

Los componentes reutilizables (`SelectField`, `DatePickerField`, `Stepper`, `SectionHeader`, `SocialIcons`) se colocaron en `app/components/ui/` formando una biblioteca interna consistente. Cada sección tiene su propio directorio dentro de `app/components/sections/` para mantener cohesión entre lógica, estilos y markup.

---

## Decisiones técnicas

### Next.js 16 con App Router

Se eligió Next.js sobre un proyecto Vite + React puro por tres razones concretas:

- **App Router y layouts:** permite encapsular providers globales (HeroUI, fuentes, tema oscuro) en un solo lugar sin contaminar los componentes de sección.
- **Optimización de fuentes:** carga de Playfair Display desde Google Fonts vía `next/font` con cero layout shift garantizado.
- **Deploy inmediato en Vercel** sin configuración adicional.

### Tailwind CSS v4

La versión 4 introduce una sintaxis de variables CSS directamente en las clases utilitarias (`text-(--primary)`, `bg-(--primary)/10`) que elimina la necesidad de `arbitrary values` para el sistema de tokens. El resultado es un código más expresivo y alineado con los tokens CSS definidos en `:root` y `.dark`.

### HeroUI v3

Usado para los componentes de formulario complejos: `Select` con `ListBox`, `DatePicker` con `Calendar` y controles de navegación. Estos componentes requieren accesibilidad robusta (roles ARIA, navegación por teclado, anuncios para lectores de pantalla) que sería costoso implementar correctamente desde cero. HeroUI se integra de forma nativa con Tailwind v4 y registra sus propias utilidades semánticas (`bg-surface`, `border-border`).

### Framer Motion v12

Elegido sobre CSS animations por las capacidades que ofrece en React:

- **`whileInView` con `viewport={{ once: true }}`:** animaciones al hacer scroll sin `IntersectionObserver` manual.
- **`AnimatePresence`:** transiciones de entrada/salida para el acordeón del FAQ, el dropdown del cotizador y el estado de éxito del formulario de contacto.
- **`layoutId`:** animación del indicador deslizante en el selector de tipo de servicio del cotizador.
- **Spring physics:** transiciones naturales en el carrusel de destinos y en los steppers numéricos.

### GSAP + ScrollTrigger

Usado en el Navbar (reducción de altura al hacer scroll) y el Hero (parallax en el fondo). GSAP maneja con precisión animaciones vinculadas a la posición del scroll que Framer Motion no expone de forma tan directa. Se mantiene aislado de los componentes React mediante `useRef` y cleanup en `useEffect`.

### Datos simulados en archivos separados

Toda la data ficticia (paquetes, destinos, reseñas, FAQs, precios del cotizador) se encuentra en `app/data/`. Esto separa la capa de presentación de la de contenido y facilita la sustitución futura por una API real sin modificar los componentes.

### Persistencia del cotizador con `localStorage`

El estado del cotizador se serializa automáticamente en `localStorage` (`vereda_quote`) en cada cambio. Al abrir la sección de contacto, el formulario detecta si existe una cotización guardada y ofrece importarla al campo de mensaje, conectando el flujo cotizador → contacto de forma natural sin backend.

---

## Librerías utilizadas

| Librería | Versión | Motivo |
|---|---|---|
| **Next.js** | 16.2.6 | Framework React con App Router, optimización de assets y deploy en Vercel |
| **React** | 19.2.4 | Librería base de UI |
| **TypeScript** | 5.x | Tipado estático para mayor robustez y autocompletado |
| **Tailwind CSS** | 4.x | Utilidades CSS con soporte nativo a variables CSS y sistema de tokens |
| **HeroUI** | 3.x | Componentes accesibles (Select, DatePicker, Calendar, Button) con integración a Tailwind v4 |
| **Framer Motion** | 12.x | Animaciones declarativas: scroll-triggered, spring physics, AnimatePresence, layoutId |
| **GSAP + ScrollTrigger** | 3.x | Animaciones vinculadas al scroll: Navbar shrink y Hero parallax |
| **Lucide React** | 1.x | Iconografía SVG consistente y tree-shakeable |

---

## Qué mejoraría con más tiempo

- **Filtros avanzados en paquetes:** filtrar por presupuesto, duración y tipo de experiencia con animación de reordenamiento mediante `layoutId` de Framer Motion.
- **Optimización de imágenes:** migrar `<img>` a `<Image>` de Next.js para lazy loading automático, formato WebP y tamaños responsivos con `srcset`.
- **Integración con API de imágenes:** reemplazar las URLs de Unsplash hardcodeadas por llamadas dinámicas a la Unsplash API o Pexels API parametrizadas por destino.
- **Pruebas automatizadas:** tests de componentes con Vitest + Testing Library, enfocados en el cotizador (lógica de precios) y el formulario de contacto (validaciones).
- **Accesibilidad más profunda:** auditoría con axe-core, mejora de navegación por teclado en el carrusel y revisión de contraste en modo oscuro.
- **Internacionalización (i18n):** soporte para inglés orientado a viajeros internacionales que lleguen al sitio.
- **Micro-interacciones:** favoritos en paquetes, estado de carga skeleton en el cotizador, cursor personalizado en el carrusel.

---

## Propuesta para una siguiente fase

### Fase 2 — Producto funcional

**1. Backend y reservas reales**
- API REST o GraphQL con autenticación (Supabase o backend propio).
- Endpoint de cotización real conectado a base de datos de precios actualizable por el equipo.
- Formulario de contacto enviando correos vía Resend o SendGrid.

**2. Panel de administración**
- CMS ligero (Payload CMS o Sanity) para que el equipo de la agencia gestione paquetes, precios, destinos y testimonios sin tocar código.

**3. Motor de búsqueda de paquetes**
- Búsqueda y filtrado avanzado por fecha, presupuesto, número de personas y tipo de experiencia.
- Integración con Algolia para búsqueda en tiempo real.

**4. Flujo de reserva completo**
- Selección de fechas con disponibilidad real.
- Carrito de viaje con múltiples paquetes y servicios adicionales.
- Pasarela de pago (Stripe o Conekta para México).
- Confirmación por correo y PDF de itinerario.

**5. Área de cliente**
- Historial de cotizaciones y reservas.
- Seguimiento del estado del viaje.
- Modificación o cancelación según política de la agencia.

**6. SEO y rendimiento**
- Páginas estáticas individuales por destino y paquete con metadata dinámica para posicionamiento orgánico.
- Implementación de Schema.org para rich snippets (precio, calificaciones, disponibilidad).
- Web Vitals en verde: optimización de LCP, CLS y INP.
