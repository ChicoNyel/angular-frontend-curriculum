import { Component, OnInit } from '@angular/core';

interface MenuItem {
  texto: string;
  ruta: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  curriculumMenu: MenuItem[] = [
    {
      texto: 'Datos Personales',
      ruta: './usuarios'
    },
    {
      texto: 'Conocimientos',
      ruta: './conocimientos/listado'
    },
    {
      texto: 'Estudios',
      ruta: './estudios/listado'
    },
    {
      texto: 'Experiencias',
      ruta: './experiencias/listado'
    }
  ]

}
