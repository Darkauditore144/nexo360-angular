/**
 * NEXO 360° — AvisoService
 * ---------------------------------------------------------------
 * Mensajes breves ("toast") que desaparecen solos. El componente
 * <app-aviso> lee la signal `mensaje` y se pinta cuando tiene texto.
 */
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AvisoService {
  readonly mensaje = signal<string | null>(null);
  private temporizador?: ReturnType<typeof setTimeout>;

  mostrar(texto: string): void {
    clearTimeout(this.temporizador);
    this.mensaje.set(texto);
    this.temporizador = setTimeout(() => this.mensaje.set(null), 2600);
  }
}
