import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ExperienciasRoutingModule } from './experiencias-routing.module';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { ListadoComponent } from './pages/listado/listado.component';


@NgModule({
  declarations: [
    AgregarComponent,
    ListadoComponent
  ],
  imports: [
    CommonModule,
    ExperienciasRoutingModule,
    FormsModule
  ]
})
export class ExperienciasModule { }
