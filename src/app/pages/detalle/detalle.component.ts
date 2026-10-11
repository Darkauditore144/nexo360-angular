/**
 * NEXO 360° — DetalleComponent (lectura de una noticia)
 * ---------------------------------------------------------------
 * La ruta es /noticia/:id. Gracias a withComponentInputBinding(), el
 * parámetro `id` de la URL llega directamente como INPUT.
 */
import { DatePipe, Location } from '@angular/common';
import { Component, computed, effect, inject, input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { CATEGORIAS } from '../../models/noticia.model';
import { InicialesPipe } from '../../pipes/iniciales.pipe';
import { AvisoService } from '../../services/aviso.service';
import { FavoritosService } from '../../services/favoritos.service';
import { NoticiasService } from '../../services/noticias.service';
import { NoticiaCardComponent } from '../../shared/noticia-card/noticia-card.component';

@Component({
  selector: 'app-detalle',
  imports: [RouterLink, DatePipe, InicialesPipe, NoticiaCardComponent],
  templateUrl: './detalle.component.html',
})
export class DetalleComponent {
  /** Parámetro de la ruta (llega como texto). */
  id = input.required<string>();

  protected readonly noticias = inject(NoticiasService);
  protected readonly favoritos = inject(FavoritosService);
  private readonly aviso = inject(AvisoService);
  private readonly titulo = inject(Title);
  private readonly ubicacion = inject(Location);

  protected readonly noticia = computed(() => this.noticias.porId(Number(this.id())));
  protected readonly categoria = computed(() => {
    const n = this.noticia();
    return n ? CATEGORIAS[n.categoria] : undefined;
  });
  protected readonly esFavorita = computed(() => this.favoritos.ids().includes(Number(this.id())));

  /** Otras noticias de la misma categoría. */
  protected readonly relacionadas = computed(() => {
    const n = this.noticia();
    return n ? this.noticias.noticias().filter((x) => x.categoria === n.categoria && x.id !== n.id).slice(0, 2) : [];
  });

  /** URL actual codificada, para los enlaces de compartir. */
  protected readonly urlActual = encodeURIComponent(window.location.href);

  constructor() {
    // effect: actualiza el título de la pestaña cada vez que cambia la noticia
    effect(() => {
      const n = this.noticia();
      this.titulo.setTitle(n ? `${n.titulo} — NEXO 360°` : 'Noticia — NEXO 360°');
    });
  }

  protected alternarFavorito(): void {
    const guardada = this.favoritos.alternar(Number(this.id()));
    this.aviso.mostrar(guardada ? 'Artículo guardado en favoritos.' : 'Artículo quitado de favoritos.');
  }

  protected volver(): void {
    this.ubicacion.back();
  }
}
