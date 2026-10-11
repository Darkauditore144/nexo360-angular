/**
 * NEXO 360° — InicialesPipe
 * ---------------------------------------------------------------
 * Un "pipe" transforma un valor dentro de la plantilla:
 *   {{ 'Camila Vargas' | iniciales }}  ->  CV
 * Se usa para el avatar de cada autor.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'iniciales' })
export class InicialesPipe implements PipeTransform {
  transform(nombre: string): string {
    return nombre.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p.charAt(0).toUpperCase()).join('');
  }
}
