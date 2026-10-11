/**
 * NEXO 360° — ContactoComponent
 * ---------------------------------------------------------------
 * Formulario reactivo con validaciones (campos obligatorios, correo
 * válido, longitud mínima y máxima) y mensaje de confirmación.
 */
import { Component, computed, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactoService } from '../../services/contacto.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { correoValido, mensajeError, sinEspacios, soloLetras } from '../../utils/validadores';

@Component({
  selector: 'app-contacto',
  imports: [ReactiveFormsModule, ModalComponent],
  templateUrl: './contacto.component.html',
})
export class ContactoComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly contactoService = inject(ContactoService);

  protected readonly asuntos = [
    'Colaboración editorial / propuesta',
    'Publicidad y patrocinios',
    'Sugerencia de cobertura',
    'Corrección o aclaración',
  ];

  protected readonly form = this.fb.group({
    nombre: ['', [Validators.required, sinEspacios, Validators.minLength(3), soloLetras, Validators.maxLength(60)]],
    correo: ['', [Validators.required, correoValido]],
    asunto: ['', [Validators.required]],
    mensaje: ['', [Validators.required, sinEspacios, Validators.minLength(20), Validators.maxLength(600)]],
  });

  /** Nombre de quien envió: si tiene valor, se muestra el diálogo de confirmación. */
  protected readonly enviadoPor = signal<string | null>(null);

  /** Contador de caracteres: signal que sigue los cambios del campo mensaje. */
  protected readonly longitudMensaje = signal(0);

  /** Pregunta frecuente abierta (acordeón sencillo con una signal). */
  protected readonly abierta = signal<number | null>(null);
  protected readonly preguntas = [
    { p: '¿Cuánto tarda la redacción en responder?', r: 'Respondemos en menos de 24 horas hábiles. Si tu mensaje es urgente, indícalo en el asunto.' },
    { p: '¿Puedo proponer un artículo como colaborador?', r: 'Sí. Elige el asunto «Colaboración editorial / propuesta» y cuéntanos el tema, la categoría y tu perfil.' },
    { p: '¿Cómo gestiono mis noticias favoritas?', r: 'Toca el corazón de cualquier noticia. Tus favoritos se guardan en este navegador y los ves en la página Favoritos.' },
  ];

  protected readonly error = (campo: string): string => {
    const c = this.form.get(campo);
    return c && (c.touched || c.dirty) ? mensajeError(c) : '';
  };

  constructor() {
    this.form.controls.mensaje.valueChanges.subscribe((v) => this.longitudMensaje.set(v.length));
  }

  protected alternarPregunta(i: number): void {
    this.abierta.update((a) => (a === i ? null : i));
  }

  protected enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      // lleva el foco al primer campo inválido (los ids coinciden con los nombres de los controles)
      const primero = Object.entries(this.form.controls).find(([, c]) => c.invalid)?.[0];
      if (primero) { document.getElementById(primero)?.focus(); }
      return;
    }
    const datos = this.form.getRawValue();
    this.contactoService.guardarMensaje({ ...datos, nombre: datos.nombre.trim(), mensaje: datos.mensaje.trim() });
    this.enviadoPor.set(datos.nombre.trim());
    this.form.reset();
    this.longitudMensaje.set(0);
  }
}
