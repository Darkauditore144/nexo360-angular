/**
 * NEXO 360° — Punto de entrada. Arranca la aplicación con el
 * componente raíz y la configuración de app.config.ts.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
