import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

import { UsuarioService } from 'src/app/usuarios/services/usuario.service';
import { Conocimiento, Usuario } from 'src/app/usuarios/usuario';
import { ConocimientosService } from '../../services/conocimientos.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html'
})
export class ListadoComponent implements OnInit {

  public usuario: Usuario = new Usuario();
  public conocimiento: Conocimiento = new Conocimiento();

  constructor(  private usuarioService: UsuarioService,
                private conocimientoService: ConocimientosService,
                private router: Router ) { }

  ngOnInit(): void {
    this.usuarioService.getUsuario( 1 ).subscribe( (usuario) => this.usuario = usuario );
  }

  agregar() {

    this.router.navigate(['./conocimientos/agregar'])
  }

  delete(conocimiento: Conocimiento): void {

    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el conocimiento ${conocimiento.descripcion}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.conocimientoService.delete(conocimiento.id).subscribe(
          response => {

            this.usuarioService.getUsuario( 1 ).subscribe( (usuario) => this.usuario = usuario );

            swal(
              'Conocimiento Eliminado!',
              `Conocimiento ${conocimiento.descripcion} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })

  }

}
