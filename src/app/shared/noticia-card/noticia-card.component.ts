/**
 * NEXO 360° — NoticiaCardComponent (tarjeta de noticia)
 * ---------------------------------------------------------------
 * Componente reutilizable. Muestra el patrón de la maqueta: imagen,
 * etiqueta, botón de favorito, título, resumen, autor, fecha y "Ver más".
 *
 *  - ENTRADAS (@Input): noticia, gestion.
 *  - SALIDAS  (@Output): editar, eliminar → el componente padre decide
 *    qué hacer (principio de componentes "tontos" y reutilizables).
 */
import { DatePipe } from '@angular/common';
import { Component, computed, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CATEGORIAS, Noticia } from '../../models/noticia.model';
import { InicialesPipe } from '../../pipes/iniciales.pipe';
import { AvisoService } from '../../services/aviso.service';
import { FavoritosService } from '../../services/favoritos.service';
import { IconoComponent } from '../icono/icono.component';

@Component({
  selector: 'app-noticia-card',
  imports: [RouterLink, DatePipe, InicialesPipe, IconoComponent],
  templateUrl: './noticia-card.component.html',
})
export class NoticiaCardComponent {
  noticia = input.required<Noticia>();
  /** Si es true se muestran los botones Editar / Eliminar (mini-CRUD). */
  gestion = input(false);

  editar = output<Noticia>();
  eliminar = output<Noticia>();

  private readonly favoritos = inject(FavoritosService);
  private readonly aviso = inject(AvisoService);

  /** Estados derivados: se recalculan solos si cambia la noticia o los favoritos. */
  protected readonly categoria = computed(() => CATEGORIAS[this.noticia().categoria]);
  protected readonly esFavorita = computed(() => this.favoritos.ids().includes(this.noticia().id));

  protected alternarFavorito(): void {
    const guardada = this.favoritos.alternar(this.noticia().id);
    this.aviso.mostrar(guardada ? 'Artículo guardado en favoritos.' : 'Artículo quitado de favoritos.');
  }
}
