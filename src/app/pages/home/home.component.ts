/**
 * NEXO 360° — HomeComponent (página de inicio)
 * ---------------------------------------------------------------
 * Secciones: bienvenida con llamados a la acción, noticia destacada,
 * últimas noticias, tendencias, boletín, "por qué NEXO 360°" y
 * testimonios. Los datos vienen de NoticiasService (signals).
 */
import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CATEGORIAS } from '../../models/noticia.model';
import { InicialesPipe } from '../../pipes/iniciales.pipe';
import { AvisoService } from '../../services/aviso.service';
import { ContactoService } from '../../services/contacto.service';
import { FavoritosService } from '../../services/favoritos.service';
import { NoticiasService } from '../../services/noticias.service';
import { IconoComponent } from '../../shared/icono/icono.component';
import { NoticiaCardComponent } from '../../shared/noticia-card/noticia-card.component';
import { correoValido, mensajeError } from '../../utils/validadores';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DatePipe, ReactiveFormsModule, InicialesPipe, IconoComponent, NoticiaCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  protected readonly noticias = inject(NoticiasService);
  protected readonly favoritos = inject(FavoritosService);
  private readonly contacto = inject(ContactoService);
  private readonly aviso = inject(AvisoService);

  protected readonly categorias = CATEGORIAS;

  /** Control individual del boletín (un solo campo no necesita FormGroup). */
  protected readonly correoBoletin = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, correoValido],
  });

  protected readonly beneficios = [
    { titulo: 'Cuatro mundos, un solo lugar', texto: 'Educación, tecnología, turismo y comercio reunidos con un código de color para reconocer cada tema de un vistazo.' },
    { titulo: 'Tu lista personal', texto: 'Guarda las noticias que te interesan con un clic. Tu lista de favoritos se conserva en este navegador.' },
    { titulo: 'Participa en la redacción', texto: 'Publica, edita o elimina noticias desde la sección Noticias y escríbenos para proponer coberturas.' },
  ];

  protected readonly testimonios = [
    { nombre: 'Laura Gómez', rol: 'Docente universitaria', texto: 'Encuentro en un solo sitio las novedades de educación y tecnología. Los favoritos me ahorran mucho tiempo.' },
    { nombre: 'Andrés Rojas', rol: 'Emprendedor agrícola', texto: 'Las notas de comercio local me han dado ideas para vender directamente a mis clientes.' },
    { nombre: 'Marcela Duarte', rol: 'Guía de turismo', texto: 'Las guías de turismo regenerativo son claras y se leen muy bien desde el celular.' },
  ];

  protected errorBoletin(): string {
    const c = this.correoBoletin;
    return c.touched || c.dirty ? mensajeError(c) : '';
  }

  protected suscribir(evento: Event): void {
    evento.preventDefault();   // evita que el navegador recargue la página
    if (this.correoBoletin.invalid) {
      this.correoBoletin.markAsTouched();
      return;
    }
    const guardado = this.contacto.guardarSuscriptor(this.correoBoletin.value.trim());
    this.correoBoletin.reset('');
    this.aviso.mostrar(guardado ? '¡Listo! Te suscribiste al boletín diario.' : 'No pudimos guardar tu suscripción en este navegador.');
  }
}
