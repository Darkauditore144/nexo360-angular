/**
 * NEXO 360° — NosotrosComponent (página informativa)
 * Cuarta página del menú: presenta la misión del medio y las
 * tecnologías con las que se construyó el proyecto.
 */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nosotros',
  imports: [RouterLink],
  templateUrl: './nosotros.component.html',
})
export class NosotrosComponent {
  protected readonly valores = [
    { titulo: 'Rigor', texto: 'Contamos historias con contexto, fuentes claras y lenguaje sencillo.' },
    { titulo: 'Cercanía', texto: 'Priorizamos temas que impactan la vida cotidiana de estudiantes, viajeros y emprendedores.' },
    { titulo: 'Participación', texto: 'Los lectores pueden guardar, proponer y publicar noticias en la plataforma.' },
  ];

  protected readonly tecnologias = [
    { nombre: 'Angular 21', uso: 'Componentes, enrutamiento, servicios, signals y enlace de datos (binding).' },
    { nombre: 'TypeScript', uso: 'Tipado de los datos y de la lógica de la aplicación.' },
    { nombre: 'Bootstrap 5', uso: 'Rejilla responsiva y estilos de formularios.' },
    { nombre: 'JSON + localStorage', uso: 'Datos de noticias y persistencia de favoritos y del mini-CRUD.' },
  ];
}
