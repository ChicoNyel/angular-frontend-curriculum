import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ExperienciasComponent } from './experiencias/experiencias.component';
import { EstudiosComponent } from './estudios/estudios.component';
import { ConocimientosComponent } from './conocimientos/conocimientos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UsuariosComponent,
    ExperienciasComponent,
    EstudiosComponent,
    ConocimientosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
