import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { DatosPersonalesComponent } from './pages/datos-personales/datos-personales.component';
import { PresentacionComponent } from './pages/presentacion/presentacion.component';
import { UsuariosComponent } from './pages/listado/usuarios.component';
import { DetalleComponent } from './pages/detalle/detalle.component';


@NgModule({
  declarations: [
    ContactoComponent,
    DatosPersonalesComponent,
    PresentacionComponent,
    UsuariosComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    MatDatepickerModule,
  ],

})
export class UsuariosModule { }
