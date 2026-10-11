/**
 * NEXO 360° — Rutas
 * ---------------------------------------------------------------
 * Cada ruta asocia una URL con un componente. `loadComponent` carga
 * cada página bajo demanda (lazy loading): el navegador descarga el
 * código de una página solo cuando el usuario la visita.
 */
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', title: 'NEXO 360° — Crónicas, turismo, comercio y el futuro del conocimiento',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent) },
  { path: 'noticias', title: 'Noticias — NEXO 360°',
    loadComponent: () => import('./pages/listado/listado.component').then((m) => m.ListadoComponent) },
  { path: 'noticia/:id',   // :id es un parámetro dinámico, ej. /noticia/6
    loadComponent: () => import('./pages/detalle/detalle.component').then((m) => m.DetalleComponent) },
  { path: 'favoritos', title: 'Mis favoritos — NEXO 360°',
    loadComponent: () => import('./pages/favoritos/favoritos.component').then((m) => m.FavoritosComponent) },
  { path: 'contacto', title: 'Contacto — NEXO 360°',
    loadComponent: () => import('./pages/contacto/contacto.component').then((m) => m.ContactoComponent) },
  { path: 'nosotros', title: 'Nosotros — NEXO 360°',
    loadComponent: () => import('./pages/nosotros/nosotros.component').then((m) => m.NosotrosComponent) },
  { path: '**', redirectTo: '' },   // cualquier otra URL vuelve al inicio
];
