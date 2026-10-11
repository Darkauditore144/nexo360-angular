/**
 * NEXO 360° — Modelos de datos (TypeScript)
 * ---------------------------------------------------------------
 * Interfaces que describen la forma de los datos del JSON.
 * Al tipar los datos, el compilador de TypeScript avisa si se usa
 * una propiedad que no existe (por ejemplo, `noticia.titulo2`).
 */

/** Identificadores válidos de categoría (tipo unión). */
export type CategoriaId = 'educacion' | 'tecnologia' | 'turismo' | 'comercio';

/** Color de la categoría: coincide con las clases CSS .tag-edu, .tag-tec, etc. */
export type ColorCategoria = 'edu' | 'tec' | 'tur' | 'com';

export interface Autor {
  nombre: string;
  cargo: string;
}

/**
 * El cuerpo de una noticia se compone de bloques tipificados:
 * párrafo (p), subtítulo (h2) o cita destacada.
 */
export type BloqueContenido =
  | { tipo: 'p' | 'h2'; texto: string }
  | { tipo: 'cita'; texto: string; fuente: string };

export interface Noticia {
  id: number;
  titulo: string;
  resumen: string;
  categoria: CategoriaId;
  autor: Autor;
  fecha: string;      // formato ISO AAAA-MM-DD
  lectura: number;    // minutos estimados
  vistas: number;
  destacada: boolean;
  imagen: string;     // ruta relativa; '' si no tiene imagen
  alt: string;
  contenido: BloqueContenido[];
}

/** Datos para crear una noticia: el id lo asigna el servicio. */
export type NoticiaNueva = Omit<Noticia, 'id'>;

/** Estructura del archivo data/noticias.json. */
export interface RespuestaNoticias {
  version: string;
  medio: string;
  noticias: Noticia[];
}

/** Catálogo de categorías con su nombre visible y color. */
export const CATEGORIAS: Record<CategoriaId, { nombre: string; color: ColorCategoria }> = {
  educacion: { nombre: 'Educación', color: 'edu' },
  tecnologia: { nombre: 'Tecnología', color: 'tec' },
  turismo: { nombre: 'Turismo', color: 'tur' },
  comercio: { nombre: 'Comercio', color: 'com' },
};

/** Lista ordenada de ids, útil para recorrerla con @for. */
export const LISTA_CATEGORIAS: CategoriaId[] = ['educacion', 'tecnologia', 'turismo', 'comercio'];
