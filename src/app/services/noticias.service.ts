/**
 * NEXO 360° — NoticiasService
 * ---------------------------------------------------------------
 * Fuente única de verdad de las noticias:
 *  1. Lee data/noticias.json con HttpClient (equivale al Ajax de la
 *     Entrega 2).
 *  2. Mezcla ese JSON con los cambios del usuario guardados en
 *     localStorage (mini-CRUD: crear, editar y eliminar).
 *  3. Expone los datos como signals y computed, de modo que las
 *     vistas se actualizan automáticamente.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Noticia, NoticiaNueva, RespuestaNoticias } from '../models/noticia.model';
import { CLAVES, borrarLS, escribirLS, leerLS } from '../utils/almacen';
import { FavoritosService } from './favoritos.service';

@Injectable({ providedIn: 'root' })
export class NoticiasService {
  private readonly http = inject(HttpClient);
  private readonly favoritos = inject(FavoritosService);

  /* ----- Estado (signals) ----- */
  private readonly base = signal<Noticia[]>([]);                              // del JSON
  private readonly propias = signal<Noticia[]>(leerLS(CLAVES.propias, []));   // creadas/editadas
  private readonly eliminadas = signal<number[]>(leerLS(CLAVES.eliminadas, []));

  readonly cargando = signal(true);
  readonly error = signal<string | null>(null);

  /* ----- Estado derivado (computed) ----- */

  /** Lista final: JSON – eliminadas + propias, de la más reciente a la más antigua. */
  readonly noticias = computed<Noticia[]>(() => {
    const mapa = new Map<number, Noticia>();
    this.base().filter((n) => !this.eliminadas().includes(n.id)).forEach((n) => mapa.set(n.id, n));
    this.propias().forEach((n) => mapa.set(n.id, n));   // reemplaza (edición) o agrega (creación)
    return [...mapa.values()].sort((a, b) => b.fecha.localeCompare(a.fecha) || b.id - a.id);
  });

  readonly destacada = computed(() => this.noticias().find((n) => n.destacada) ?? this.noticias()[0]);

  readonly ultimas = computed(() => {
    const idDestacada = this.destacada()?.id;
    return this.noticias().filter((n) => n.id !== idDestacada).slice(0, 4);
  });

  readonly tendencias = computed(() => [...this.noticias()].sort((a, b) => b.vistas - a.vistas).slice(0, 5));

  constructor() {
    this.cargar();
  }

  /** Pide el JSON al servidor (ruta relativa a <base href>). */
  cargar(): void {
    this.cargando.set(true);
    this.http.get<RespuestaNoticias>('data/noticias.json').subscribe({
      next: (r) => { this.base.set(r.noticias); this.cargando.set(false); },
      error: () => { this.error.set('No se pudieron cargar las noticias.'); this.cargando.set(false); },
    });
  }

  porId(id: number): Noticia | undefined {
    return this.noticias().find((n) => n.id === id);
  }

  /* ----- Mini-CRUD ----- */

  /** CREATE */
  crear(datos: NoticiaNueva): Noticia {
    const siguienteId = Math.max(0, ...this.noticias().map((n) => n.id), ...this.eliminadas()) + 1;
    const nueva: Noticia = { id: siguienteId, ...datos };
    this.propias.update((l) => [...l, nueva]);
    escribirLS(CLAVES.propias, this.propias());
    return nueva;
  }

  /** UPDATE: reemplaza la noticia (del JSON o propia) por su versión editada. */
  actualizar(noticia: Noticia): void {
    this.propias.update((l) => [...l.filter((n) => n.id !== noticia.id), noticia]);
    escribirLS(CLAVES.propias, this.propias());
  }

  /** DELETE: oculta una noticia del JSON o borra una propia; también la quita de favoritos. */
  eliminar(id: number): void {
    this.propias.update((l) => l.filter((n) => n.id !== id));
    escribirLS(CLAVES.propias, this.propias());
    if (this.base().some((n) => n.id === id) && !this.eliminadas().includes(id)) {
      this.eliminadas.update((l) => [...l, id]);
      escribirLS(CLAVES.eliminadas, this.eliminadas());
    }
    this.favoritos.quitar(id);
  }

  /** Borra todos los cambios del usuario y vuelve al contenido original del JSON. */
  restablecer(): void {
    this.propias.set([]);
    this.eliminadas.set([]);
    borrarLS(CLAVES.propias);
    borrarLS(CLAVES.eliminadas);
    this.favoritos.restablecer();
  }
}
