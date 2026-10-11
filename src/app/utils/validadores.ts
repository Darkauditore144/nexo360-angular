/**
 * NEXO 360° — Validadores y mensajes de error de formularios
 * ---------------------------------------------------------------
 * Un validador es una función que recibe un control y devuelve
 * `null` si el valor es válido o un objeto de error si no lo es.
 */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Solo letras (con tildes y ñ), espacios, guion y apóstrofo. */
export const soloLetras: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
  const v = String(c.value ?? '').trim();
  return v === '' || /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/.test(v) ? null : { soloLetras: true };
};

/** Rechaza valores formados solo por espacios en blanco. */
export const sinEspacios: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
  const v = String(c.value ?? '');
  return v.length > 0 && v.trim() === '' ? { requerido: true } : null;
};

/** Correo con formato nombre@dominio.ext (más estricto que Validators.email). */
export const correoValido: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
  const v = String(c.value ?? '').trim();
  return v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? null : { correo: true };
};

/** Fecha que no sea posterior a hoy (para publicar noticias). */
export const fechaNoFutura: ValidatorFn = (c: AbstractControl): ValidationErrors | null => {
  const v = String(c.value ?? '');
  if (!v) { return null; }
  const hoy = new Date().toISOString().slice(0, 10);
  return v > hoy ? { fechaFutura: true } : null;
};

/** Traduce el primer error de un control a un mensaje legible. */
export function mensajeError(c: AbstractControl | null): string {
  if (!c || !c.errors) { return ''; }
  const e = c.errors;
  if (e['required'] || e['requerido']) { return 'Este campo es obligatorio.'; }
  if (e['minlength']) { return `Escribe al menos ${e['minlength'].requiredLength} caracteres.`; }
  if (e['maxlength']) { return `Máximo ${e['maxlength'].requiredLength} caracteres.`; }
  if (e['soloLetras']) { return 'Usa solo letras y espacios.'; }
  if (e['correo']) { return 'Escribe un correo válido (ej. nombre@dominio.com).'; }
  if (e['fechaFutura']) { return 'La fecha no puede ser posterior a hoy.'; }
  return 'Valor no válido.';
}
