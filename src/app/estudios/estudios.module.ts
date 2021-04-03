import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EstudiosRoutingModule } from './estudios-routing.module';
import { ListadoComponent } from './pages/listado/listado.component';
import { AgregarComponent } from './pages/agregar/agregar.component';


@NgModule({
  declarations: [
    ListadoComponent,
    AgregarComponent
  ],
  imports: [
    CommonModule,
    EstudiosRoutingModule,
    FormsModule
  ]
})
export class EstudiosModule { }
