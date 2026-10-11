/**
 * NEXO 360° — FooterComponent
 * Pie de página con información general y datos de contacto visibles
 * (requisito de la página de inicio).
 */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  protected readonly anio = new Date().getFullYear();
}
