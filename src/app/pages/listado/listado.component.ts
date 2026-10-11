/**
 * NEXO 360° — ListadoComponent (página "Noticias" + mini-CRUD)
 * ---------------------------------------------------------------
 *  - Filtros con signals y [(ngModel)]; la lista filtrada es un
 *    computed que se recalcula sola.
 *  - Los parámetros de la URL (?cat=turismo&q=texto) llegan como
 *    INPUTS gracias a withComponentInputBinding() en app.config.ts.
 *  - Crear / editar / eliminar abren el ModalComponent.
 */
import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CATEGORIAS, LISTA_CATEGORIAS, Noticia, NoticiaNueva } from '../../models/noticia.model';
import { AvisoService } from '../../services/aviso.service';
import { NoticiasService } from '../../services/noticias.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { NoticiaCardComponent } from '../../shared/noticia-card/noticia-card.component';
import { NoticiaFormComponent } from '../../shared/noticia-form/noticia-form.component';

type Orden = 'recientes' | 'antiguas' | 'vistas';

@Component({
  selector: 'app-listado',
  imports: [FormsModule, RouterLink, NoticiaCardComponent, ModalComponent, NoticiaFormComponent],
  templateUrl: './listado.component.html',
})
export class ListadoComponent {
  protected readonly noticias = inject(NoticiasService);
  private readonly aviso = inject(AvisoService);

  /** Parámetros de la URL (opcionales). */
  cat = input<string>();
  q = input<string>();

  protected readonly categorias = LISTA_CATEGORIAS.map((id) => ({ id, nombre: CATEGORIAS[id].nombre }));

  /**
   * linkedSignal: toma su valor inicial de la URL pero el usuario puede
   * cambiarlo con los botones; si la URL cambia, se vuelve a sincronizar.
   */
  protected readonly categoria = linkedSignal(() => this.cat() ?? 'todas');
  protected readonly texto = linkedSignal(() => this.q() ?? '');
  protected readonly orden = signal<Orden>('recientes');

  /** Lista filtrada y ordenada: se recalcula sola cuando cambia cualquier dependencia. */
  protected readonly resultados = computed<Noticia[]>(() => {
    const t = this.texto().trim().toLowerCase();
    const lista = this.noticias.noticias().filter((n) => {
      const okCat = this.categoria() === 'todas' || n.categoria === this.categoria();
      const okTexto = !t || `${n.titulo} ${n.resumen} ${n.autor.nombre}`.toLowerCase().includes(t);
      return okCat && okTexto;
    });
    if (this.orden() === 'vistas') { lista.sort((a, b) => b.vistas - a.vistas); }
    if (this.orden() === 'antiguas') { lista.sort((a, b) => a.fecha.localeCompare(b.fecha)); }
    return lista;
  });

  /* ----- Estado de los diálogos ----- */
  protected readonly creando = signal(false);
  protected readonly editando = signal<Noticia | null>(null);
  protected readonly porEliminar = signal<Noticia | null>(null);

  protected guardarNueva(datos: NoticiaNueva): void {
    this.noticias.crear(datos);
    this.creando.set(false);
    this.aviso.mostrar('Noticia publicada.');
  }

  protected guardarEdicion(datos: NoticiaNueva): void {
    const original = this.editando();
    if (original) {
      this.noticias.actualizar({ ...datos, id: original.id });
      this.aviso.mostrar('Noticia actualizada.');
    }
    this.editando.set(null);
  }

  protected confirmarEliminar(): void {
    const n = this.porEliminar();
    if (n) {
      this.noticias.eliminar(n.id);
      this.aviso.mostrar('Noticia eliminada.');
    }
    this.porEliminar.set(null);
  }

  protected restablecer(): void {
    this.noticias.restablecer();
    this.aviso.mostrar('Datos originales restablecidos.');
  }
}
