import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { ListadoComponent } from './pages/listado/listado.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'listado',
        component: ListadoComponent
      },
      {
        path: 'agregar',
        component: AgregarComponent
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
  ]
})
export class EstudiosRoutingModule { }
