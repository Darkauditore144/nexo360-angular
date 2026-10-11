/**
 * NEXO 360° — FavoritosComponent
 * ---------------------------------------------------------------
 * Cruza la lista de ids de FavoritosService con las noticias de
 * NoticiasService. Todo es computed: al quitar un favorito desde
 * cualquier lugar, esta página se actualiza sola.
 */
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CATEGORIAS, LISTA_CATEGORIAS } from '../../models/noticia.model';
import { FavoritosService } from '../../services/favoritos.service';
import { NoticiasService } from '../../services/noticias.service';
import { IconoComponent } from '../../shared/icono/icono.component';
import { NoticiaCardComponent } from '../../shared/noticia-card/noticia-card.component';

@Component({
  selector: 'app-favoritos',
  imports: [RouterLink, IconoComponent, NoticiaCardComponent],
  templateUrl: './favoritos.component.html',
})
export class FavoritosComponent {
  protected readonly noticias = inject(NoticiasService);
  protected readonly favoritos = inject(FavoritosService);

  protected readonly categorias = LISTA_CATEGORIAS.map((id) => ({ id, nombre: CATEGORIAS[id].nombre }));
  protected readonly categoria = signal<string>('todas');

  /** Todas las noticias guardadas. */
  protected readonly guardadas = computed(() =>
    this.noticias.noticias().filter((n) => this.favoritos.ids().includes(n.id)),
  );

  /** Las guardadas que cumplen el filtro de categoría. */
  protected readonly visibles = computed(() =>
    this.guardadas().filter((n) => this.categoria() === 'todas' || n.categoria === this.categoria()),
  );
}
