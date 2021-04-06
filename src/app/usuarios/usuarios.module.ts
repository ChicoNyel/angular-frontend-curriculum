import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { DatosPersonalesComponent } from './pages/datos-personales/datos-personales.component';
import { PresentacionComponent } from './pages/presentacion/presentacion.component';
import { UsuariosComponent } from './pages/listado/usuarios.component';


@NgModule({
  declarations: [
    ContactoComponent,
    DatosPersonalesComponent,
    PresentacionComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule
  ]
})
export class UsuariosModule { }
