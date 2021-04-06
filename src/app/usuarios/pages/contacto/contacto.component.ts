import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../usuario';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styles: [
  ]
})
export class ContactoComponent implements OnInit {

  public usuario: Usuario = new Usuario();

  public errores: string[];

  constructor( private usuarioService: UsuarioService,
               private router: Router,
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

  update(): void {

    this.usuarioService.update( this.usuario )
      .subscribe( json => {
        this.router.navigate(['/usuarios/listado'])
        swal('Usuario Actualizado', `${ json.mensaje } : ${ json.usuario.primerNombre }`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
      );

  }

}
