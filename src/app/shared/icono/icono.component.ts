/**
 * NEXO 360° — IconoComponent
 * Dibuja iconos SVG en línea según el nombre recibido. Evita repetir
 * el mismo SVG en cada plantilla y no depende de librerías externas.
 */
import { Component, input } from '@angular/core';

export type NombreIcono = 'corazon' | 'editar' | 'borrar' | 'buscar' | 'campana' | 'usuario';

@Component({
  selector: 'app-icono',
  templateUrl: './icono.component.html',
})
export class IconoComponent {
  /** Entrada (@Input moderno con signals): el padre escribe <app-icono nombre="corazon" /> */
  nombre = input.required<NombreIcono>();
  tamano = input(20);
}
