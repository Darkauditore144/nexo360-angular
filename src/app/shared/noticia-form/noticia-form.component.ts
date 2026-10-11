/**
 * NEXO 360° — NoticiaFormComponent (formulario del mini-CRUD)
 * ---------------------------------------------------------------
 * Formulario REACTIVO para crear o editar una noticia.
 *  - La estructura y las reglas viven en la clase (FormGroup + Validators).
 *  - La plantilla solo enlaza (binding) cada <input> con su control
 *    mediante [formGroup] y formControlName.
 *  - Entrada: `noticia` (null = crear, objeto = editar).
 *  - Salidas: `guardado` (datos válidos) y `cancelado`.
 */
import { Component, OnInit, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CATEGORIAS, LISTA_CATEGORIAS, Noticia, NoticiaNueva } from '../../models/noticia.model';
import { fechaNoFutura, mensajeError, sinEspacios, soloLetras } from '../../utils/validadores';

/** Imágenes disponibles en /img para elegir en el formulario. */
export const IMAGENES_DISPONIBLES: { ruta: string; nombre: string }[] = [
  { ruta: '', nombre: 'Sin imagen (bloque de color)' },
  { ruta: 'img/edu-aula-abierta.jpg', nombre: 'Aula abierta (educación)' },
  { ruta: 'img/tec-cuantica.jpg', nombre: 'Laboratorio cuántico (tecnología)' },
  { ruta: 'img/tur-santuarios.jpg', nombre: 'Lago y montañas (turismo)' },
  { ruta: 'img/com-mercado.jpg', nombre: 'Mercado (comercio)' },
];

@Component({
  selector: 'app-noticia-form',
  imports: [ReactiveFormsModule],
  templateUrl: './noticia-form.component.html',
})
export class NoticiaFormComponent implements OnInit {
  noticia = input<Noticia | null>(null);
  guardado = output<NoticiaNueva>();
  cancelado = output<void>();

  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly categorias = LISTA_CATEGORIAS.map((id) => ({ id, nombre: CATEGORIAS[id].nombre }));
  protected readonly imagenes = IMAGENES_DISPONIBLES;
  protected readonly maxFecha = new Date().toISOString().slice(0, 10);

  /** Definición del formulario: valor inicial + validadores de cada campo. */
  protected readonly form = this.fb.group({
    titulo: ['', [Validators.required, sinEspacios, Validators.minLength(10), Validators.maxLength(140)]],
    categoria: ['', [Validators.required]],
    fecha: [this.maxFecha, [Validators.required, fechaNoFutura]],
    autor: ['', [Validators.required, sinEspacios, Validators.minLength(3), soloLetras]],
    resumen: ['', [Validators.required, sinEspacios, Validators.minLength(30), Validators.maxLength(260)]],
    contenido: ['', [Validators.required, sinEspacios, Validators.minLength(50)]],
    imagen: [''],
  });

  protected readonly error = (campo: string): string => {
    const c = this.form.get(campo);
    return c && (c.touched || c.dirty) ? mensajeError(c) : '';
  };

  ngOnInit(): void {
    const n = this.noticia();
    if (n) {   // modo edición: se rellenan los campos con los datos actuales
      this.form.patchValue({
        titulo: n.titulo, categoria: n.categoria, fecha: n.fecha, autor: n.autor.nombre,
        resumen: n.resumen, imagen: n.imagen,
        contenido: n.contenido.filter((b) => b.tipo === 'p').map((b) => b.texto).join('\n'),
      });
    }
  }

  protected enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();   // muestra todos los errores a la vez
      const primero = Object.entries(this.form.controls).find(([, c]) => c.invalid)?.[0];
      if (primero) { document.getElementById('n-' + primero)?.focus(); }
      return;
    }
    const v = this.form.getRawValue();
    const original = this.noticia();
    const parrafos = v.contenido.split(/\n+/).map((t) => t.trim()).filter(Boolean);
    const palabras = parrafos.join(' ').split(/\s+/).length;

    this.guardado.emit({
      titulo: v.titulo.trim(),
      resumen: v.resumen.trim(),
      categoria: v.categoria as Noticia['categoria'],
      autor: { nombre: v.autor.trim(), cargo: original?.autor.cargo ?? 'Colaborador de la redacción' },
      fecha: v.fecha,
      lectura: Math.max(1, Math.round(palabras / 200)),
      vistas: original?.vistas ?? 0,
      destacada: original?.destacada ?? false,
      imagen: v.imagen,
      alt: this.imagenes.find((i) => i.ruta === v.imagen)?.nombre ?? '',
      contenido: parrafos.map((texto) => ({ tipo: 'p' as const, texto })),
    });
  }
}
