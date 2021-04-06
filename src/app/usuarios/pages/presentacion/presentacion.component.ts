import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../usuario';

@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styles: [
  ]
})
export class PresentacionComponent implements OnInit {

  public usuario: Usuario = new Usuario();

  constructor( private usuarioService: UsuarioService,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario(): void {
    this.activatedRoute.params.subscribe( params => {
      let id = params['id']
      if( id ){
        this.usuarioService.getUsuario( id ).subscribe(
          (usuario) => this.usuario = usuario
        )
      }
    })
  }

}
