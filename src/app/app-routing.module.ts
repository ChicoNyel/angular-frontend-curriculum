import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path: 'conocimientos',
    loadChildren: () => import('./conocimientos/conocimientos.module').then( m => m.ConocimientosModule )
  },
  {
    path: 'estudios',
    loadChildren: () => import('./estudios/estudios.module').then( m => m.EstudiosModule )
  },
  {
    path: 'experiencias',
    loadChildren: () => import('./experiencias/experiencias.module').then( m => m.ExperienciasModule )
  },
  {
    path: '**',
    redirectTo: 'usuarios'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
