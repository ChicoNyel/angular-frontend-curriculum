import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { DatosPersonalesComponent } from './pages/datos-personales/datos-personales.component';
import { PresentacionComponent } from './pages/presentacion/presentacion.component';
import { UsuariosComponent } from './pages/listado/usuarios.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'listado',
        component: UsuariosComponent
      },
      {
        path: 'personales/:id',
        component: DatosPersonalesComponent
      },
      {
        path: 'contacto/:id',
        component: ContactoComponent
      },
      {
        path: 'presentacion/:id',
        component: PresentacionComponent
      },
      {
        path: '**',
        redirectTo: 'listado'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsuariosRoutingModule { }
