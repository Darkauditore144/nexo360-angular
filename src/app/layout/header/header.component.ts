/**
 * NEXO 360° — HeaderComponent (franja superior, logotipo y menú)
 * ---------------------------------------------------------------
 * Demuestra: routerLink / routerLinkActive (navegación sin recargar),
 * binding de eventos y propiedades, [(ngModel)] y signals.
 */
import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FavoritosService } from '../../services/favoritos.service';
import { NoticiasService } from '../../services/noticias.service';
import { IconoComponent } from '../../shared/icono/icono.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FormsModule, DatePipe, IconoComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private readonly router = inject(Router);
  protected readonly noticias = inject(NoticiasService);
  protected readonly favoritos = inject(FavoritosService);

  protected readonly hoy = new Date();
  protected readonly menuAbierto = signal(false);
  protected readonly alertasAbiertas = signal(false);
  protected readonly busqueda = signal('');

  /** Las 3 noticias más recientes para el panel de alertas. */
  protected readonly alertas = computed(() => this.noticias.noticias().slice(0, 3));

  /** Opciones de enrutamiento para que un enlace con ?cat= solo se marque si coincide exactamente. */
  protected readonly exacto = { paths: 'exact', queryParams: 'exact', fragment: 'ignored', matrixParams: 'ignored' } as const;

  protected alternarMenu(): void { this.menuAbierto.update((v) => !v); }
  protected cerrarMenu(): void { this.menuAbierto.set(false); }

  protected alternarAlertas(): void { this.alertasAbiertas.update((v) => !v); }

  /** Si el texto coincide con un titular exacto va al detalle; si no, al listado filtrado. */
  protected buscar(): void {
    const q = this.busqueda().trim();
    const exacta = this.noticias.noticias().find((n) => n.titulo.toLowerCase() === q.toLowerCase());
    this.cerrarMenu();
    if (exacta) {
      this.router.navigate(['/noticia', exacta.id]);
    } else {
      this.router.navigate(['/noticias'], { queryParams: q ? { q } : {} });
    }
  }
}
