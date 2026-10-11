/**
 * NEXO 360° — ModalComponent (ventana de diálogo reutilizable)
 * ---------------------------------------------------------------
 * Usa el elemento nativo <dialog> y su método showModal(), que ya
 * incluye: fondo oscuro, captura del foco (focus trap) y cierre con
 * la tecla Esc. El contenido lo pone quien lo usa mediante
 * PROYECCIÓN DE CONTENIDO (<ng-content>):
 *
 *   <app-modal titulo="Eliminar noticia" (cerrar)="...">
 *     ...contenido y botones...
 *   </app-modal>
 *
 * El componente se crea con @if cuando hace falta y se destruye al
 * cerrarse, así los formularios internos siempre arrancan limpios.
 */
import { Component, ElementRef, afterNextRender, input, output, viewChild } from '@angular/core';

let contador = 0;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  /** Entrada: título de la ventana. */
  titulo = input.required<string>();
  /** Salida (evento personalizado): avisa al padre que se pidió cerrar. */
  cerrar = output<void>();

  readonly idTitulo = `modal-titulo-${++contador}`;
  private readonly dialogo = viewChild.required<ElementRef<HTMLDialogElement>>('dlg');

  constructor() {
    // Se ejecuta cuando el componente ya está en el DOM
    afterNextRender(() => this.dialogo().nativeElement.showModal());
  }

  /** Esc dispara el evento "cancel": se evita el cierre automático y se avisa al padre. */
  alCancelar(e: Event): void {
    e.preventDefault();
    this.cerrar.emit();
  }

  /** Clic sobre el fondo oscuro (el propio <dialog>) cierra la ventana. */
  alHacerClic(e: MouseEvent): void {
    if (e.target === this.dialogo().nativeElement) { this.cerrar.emit(); }
  }
}
