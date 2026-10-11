/**
 * NEXO 360° — Configuración de la aplicación
 * ---------------------------------------------------------------
 * Lista de "providers" que se registran al arrancar:
 *  - provideRouter: activa el enrutador con tres opciones:
 *      · withHashLocation(): URLs con "#" (ej. /#/noticias). Evita el
 *        error 404 al recargar la página en hostings estáticos como
 *        GitHub Pages.
 *      · withComponentInputBinding(): los parámetros de la URL llegan
 *        como @Input de cada componente.
 *      · withInMemoryScrolling: vuelve arriba al cambiar de página.
 *  - provideHttpClient: habilita HttpClient (lectura del JSON).
 *  - LOCALE_ID: idioma español para el pipe `date`.
 */
import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import localeEsCo from '@angular/common/locales/es-CO';
import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

registerLocaleData(localeEsCo);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withHashLocation(),
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
    ),
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'es-CO' },
  ],
};
