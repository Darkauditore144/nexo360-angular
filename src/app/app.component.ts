/**
 * NEXO 360° — AppComponent (componente raíz)
 * ---------------------------------------------------------------
 * Es el "esqueleto" de la aplicación: encabezado + zona cambiante
 * + pie. <router-outlet> es el lugar donde Angular muestra el
 * componente de la página que corresponde a la URL.
 */
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { AvisoComponent } from './shared/aviso/aviso.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AvisoComponent],
  template: `
    <app-header />
    <main id="contenido" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />
    <app-aviso />
  `,
})
export class AppComponent {}
