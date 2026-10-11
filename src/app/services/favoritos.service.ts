/**
 * NEXO 360° — FavoritosService
 * ---------------------------------------------------------------
 * Guarda los ids de las noticias favoritas con una SIGNAL y los
 * persiste en localStorage. Cualquier componente que lea `ids()`
 * o `contador()` se actualiza solo cuando cambian (binding reactivo).
 *
 * `providedIn: 'root'` crea una única instancia compartida (singleton)
 * para toda la aplicación: así el contador del encabezado y la página
 * de Favoritos siempre muestran lo mismo.
 */
import { Injectable, computed, signal } from '@angular/core';
import { CLAVES, escribirLS, leerLS } from '../utils/almacen';

/** Favoritos de ejemplo en la primera visita (igual que la maqueta). */
const FAVORITOS_INICIALES = [6, 7, 8];

@Injectable({ providedIn: 'root' })
export class FavoritosService {
  /** Estado: lista de ids guardados. */
  readonly ids = signal<number[]>(this.cargarInicial());

  /** Estado derivado: cantidad de favoritos (se recalcula sola). */
  readonly contador = computed(() => this.ids().length);

  private cargarInicial(): number[] {
    const guardados = leerLS<number[] | null>(CLAVES.favoritos, null);
    if (guardados === null) {              // primera visita: sembrar ejemplo
      escribirLS(CLAVES.favoritos, FAVORITOS_INICIALES);
      return [...FAVORITOS_INICIALES];
    }
    return guardados;
  }

  esFavorito(id: number): boolean {
    return this.ids().includes(id);
  }

  /** Agrega o quita un favorito. Devuelve true si quedó guardado. */
  alternar(id: number): boolean {
    const quedaGuardado = !this.esFavorito(id);
    this.ids.update((lista) => (quedaGuardado ? [...lista, id] : lista.filter((x) => x !== id)));
    escribirLS(CLAVES.favoritos, this.ids());
    return quedaGuardado;
  }

  /** Se usa cuando se elimina una noticia: ya no puede ser favorita. */
  quitar(id: number): void {
    if (this.esFavorito(id)) {
      this.ids.update((lista) => lista.filter((x) => x !== id));
      escribirLS(CLAVES.favoritos, this.ids());
    }
  }

  /** Vuelve a los favoritos de ejemplo (al restablecer datos). */
  restablecer(): void {
    this.ids.set([...FAVORITOS_INICIALES]);
    escribirLS(CLAVES.favoritos, this.ids());
  }
}
