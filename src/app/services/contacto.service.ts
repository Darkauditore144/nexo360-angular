/**
 * NEXO 360° — ContactoService
 * ---------------------------------------------------------------
 * Guarda en localStorage los mensajes del formulario de contacto y
 * las suscripciones al boletín. En un proyecto real, estos métodos
 * enviarían los datos a una API con HttpClient.post().
 */
import { Injectable } from '@angular/core';
import { CLAVES, escribirLS, leerLS } from '../utils/almacen';

export interface MensajeContacto {
  nombre: string;
  correo: string;
  asunto: string;
  mensaje: string;
  enviado?: string;
}

@Injectable({ providedIn: 'root' })
export class ContactoService {
  guardarMensaje(m: MensajeContacto): boolean {
    const lista = leerLS<MensajeContacto[]>(CLAVES.mensajes, []);
    lista.push({ ...m, enviado: new Date().toISOString() });
    return escribirLS(CLAVES.mensajes, lista);
  }

  guardarSuscriptor(correo: string): boolean {
    const lista = leerLS<string[]>(CLAVES.suscriptores, []);
    if (!lista.includes(correo)) { lista.push(correo); }
    return escribirLS(CLAVES.suscriptores, lista);
  }
}
