import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/usuarios/services/usuario.service';
import { Usuario } from 'src/app/usuarios/usuario';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html'
})
export class ListadoComponent implements OnInit {

  public usuario: Usuario = new Usuario();

  constructor(  private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuario( 1 ).subscribe( (usuario) => this.usuario = usuario );
  }

}
