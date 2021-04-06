import { ExperienciasRoutingModule } from './experiencias/experiencias-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ConocimientosModule } from './conocimientos/conocimientos.module';
import { EstudiosModule } from './estudios/estudios.module';
import { UsuariosModule } from './usuarios/usuarios.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConocimientosModule,
    EstudiosModule,
    ExperienciasRoutingModule,
    UsuariosModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
