# NEXO 360° — Aplicación Angular (Entrega final)

Plataforma web de noticias de **educación, tecnología, turismo y comercio**, desarrollada en **Angular 21** para el módulo
*Desarrollo de Front-end* (Politécnico Grancolombiano). Es la evolución del prototipo de la Entrega Previa 2 (HTML + CSS +
JavaScript + jQuery) a una aplicación de componentes con enlace de datos (*data binding*).

- **Aplicación desplegada:** `https://darkauditore144.github.io/nexo360-angular/#/`
- **Repositorio:** `https://github.com/Darkauditore144/nexo360-angular`  ← reemplazar con la URL real
- **Video explicativo:** `<enlace de YouTube>`  ← reemplazar con el enlace real

## Funcionalidades
- **Inicio:** bienvenida con llamados a la acción, noticia destacada, últimas noticias, tendencias, boletín, sección informativa y testimonios.
- **Noticias:** tarjetas, filtros por categoría, búsqueda, orden y **mini-CRUD** (crear, editar y eliminar) con diálogos.
- **Detalle:** lectura completa, favoritos, compartir y noticias relacionadas (`#/noticia/:id`).
- **Favoritos:** lista personal con filtro por categoría (persistida en `localStorage`).
- **Contacto:** formulario reactivo con validaciones y confirmación, preguntas frecuentes.
- **Nosotros:** misión, valores y tecnologías.
- Responsive y accesible (WCAG 2.2: foco visible, `aria-*`, `<dialog>` nativo, enlace «Saltar al contenido»).

## Conceptos de Angular utilizados
Componentes standalone · plantillas con `@if` / `@for` / `@switch` · interpolación `{{ }}` · enlace de propiedades `[prop]` y eventos `(evento)` ·
enlace bidireccional `[(ngModel)]` · `input()` / `output()` (entradas y salidas) · servicios con inyección de dependencias (`inject`) ·
*signals*, `computed`, `linkedSignal`, `effect` · pipes (`date`, pipe propio `iniciales`) · enrutamiento con carga diferida (`loadComponent`) y
parámetros → entradas · formularios reactivos con validadores personalizados · `HttpClient` · proyección de contenido (`<ng-content>`).

## Estructura
```
src/
├── index.html · main.ts · styles.css
└── app/
    ├── app.component.ts · app.config.ts · app.routes.ts
    ├── models/noticia.model.ts          Interfaces y categorías
    ├── services/                        noticias · favoritos · contacto · aviso
    ├── utils/                           almacen (localStorage) · validadores
    ├── pipes/iniciales.pipe.ts
    ├── layout/                          header · footer
    ├── shared/                          icono · modal · aviso · noticia-card · noticia-form
    └── pages/                           home · listado · detalle · favoritos · contacto · nosotros
public/
├── data/noticias.json                   Fuente de datos
└── img/                                 Imágenes
```

## Ejecutar en local
```bash
npm install
npm start            # http://localhost:4200
```
Requiere Node.js 20.19+ (recomendado 22) y npm.

## Compilar y desplegar
```bash
npm run build:pages  # genera dist/nexo360-angular/browser con base-href /nexo360-frontend/
```
- **GitHub Pages (recomendado):** el flujo `.github/workflows/deploy.yml` compila y publica en cada `git push` a `main`.
  Activar una sola vez en *Settings → Pages → Source → GitHub Actions*.
- **Netlify / Vercel:** importar el repositorio; `netlify.toml` y `vercel.json` ya tienen el comando y la carpeta de salida.
- La aplicación usa rutas con `#` (`withHashLocation`) para que recargar la página no produzca error 404 en hostings estáticos.

## Autor
Entrega individual — Desarrollo de Front-end. Tutor: John Olarte Ramos.
