/**
 * NEXO 360° — Utilidades de localStorage
 * ---------------------------------------------------------------
 * Funciones que leen y escriben JSON en localStorage con manejo de
 * errores (modo privado, cuota excedida o JSON corrupto): si algo
 * falla, la aplicación sigue funcionando con valores por defecto.
 */

/** Claves usadas en localStorage (prefijo "nexo_" para evitar choques). */
export const CLAVES = {
  favoritos: 'nexo_favoritos',
  propias: 'nexo_noticias_propias',        // noticias creadas o editadas
  eliminadas: 'nexo_noticias_eliminadas',  // ids de noticias del JSON ocultadas
  mensajes: 'nexo_mensajes',
  suscriptores: 'nexo_suscriptores',
} as const;

export function leerLS<T>(clave: string, porDefecto: T): T {
  try {
    const bruto = localStorage.getItem(clave);
    return bruto === null ? porDefecto : (JSON.parse(bruto) as T);
  } catch {
    return porDefecto;
  }
}

export function escribirLS(clave: string, valor: unknown): boolean {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
}

export function borrarLS(clave: string): void {
  try {
    localStorage.removeItem(clave);
  } catch {
    /* sin acceso a localStorage: se ignora */
  }
}
