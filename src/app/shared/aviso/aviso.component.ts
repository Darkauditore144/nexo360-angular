/**
 * NEXO 360° — AvisoComponent
 * Muestra el mensaje temporal del AvisoService. role="status" hace que
 * los lectores de pantalla lo anuncien sin quitar el foco al usuario.
 */
import { Component, inject } from '@angular/core';
import { AvisoService } from '../../services/aviso.service';

@Component({
  selector: 'app-aviso',
  template: `
    @if (aviso.mensaje(); as texto) {
      <div class="toast-nexo" role="status">{{ texto }}</div>
    }
  `,
})
export class AvisoComponent {
  protected readonly aviso = inject(AvisoService);
}
