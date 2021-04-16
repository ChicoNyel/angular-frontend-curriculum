import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './seguridad/guards/auth.guard';
import { RoleGuard } from './seguridad/guards/role.guard';
import { LoginComponent } from './seguridad/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then( m => m.UsuariosModule ),
    canActivate:[AuthGuard, RoleGuard],
    data: {role: 'ROLE_USER'}
  },
  {
    path: 'conocimientos',
    loadChildren: () => import('./conocimientos/conocimientos.module').then( m => m.ConocimientosModule ),
    canActivate:[AuthGuard, RoleGuard],
    data: {role: 'ROLE_USER'}
  },
  {
    path: 'estudios',
    loadChildren: () => import('./estudios/estudios.module').then( m => m.EstudiosModule ),
    canActivate:[AuthGuard, RoleGuard],
    data: {role: 'ROLE_USER'}
  },
  {
    path: 'experiencias',
    loadChildren: () => import('./experiencias/experiencias.module').then( m => m.ExperienciasModule ),
    canActivate:[AuthGuard, RoleGuard],
    data: {role: 'ROLE_USER'}
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
