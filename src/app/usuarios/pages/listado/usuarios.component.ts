import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../usuario';

import { UsuarioService } from '../../services/usuario.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  public usuario: Usuario = new Usuario();
  usuarioSeleccionado: Usuario;

  constructor( private usuarioService: UsuarioService,
               private modalService: ModalService ) { }

  ngOnInit(): void {

    this.usuarioService.getUsuario( 1 ).subscribe( (usuario) => this.usuario = usuario );

    this.modalService.notificarUpload.subscribe( usuario => {
      this.usuario = usuario.foto;
    })

  }

  abrirModal(usuario: Usuario){
    this.usuarioSeleccionado = usuario;
    this.modalService.abrirModal();
  }

}
