import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';

import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  public usuario: Usuario = new Usuario();

  constructor(  private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuario( 1 ).subscribe( (usuario) => this.usuario = usuario );
  }

}
