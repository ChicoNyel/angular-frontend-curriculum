import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import swal from 'sweetalert2';

import { UsuarioService } from 'src/app/usuarios/services/usuario.service';
import { Estudio, Usuario } from 'src/app/usuarios/usuario';
import { EstudiosService } from '../../services/estudios.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html'
})
export class ListadoComponent implements OnInit {

  public usuario: Usuario = new Usuario();
  public estudio: Estudio = new Estudio();

  constructor(  private usuarioService: UsuarioService,
                private estudiosService: EstudiosService,
                private router: Router ) { }

  ngOnInit(): void {
    this.usuarioService.getUsuario( 1 ).subscribe( (usuario) => this.usuario = usuario );
  }

  agregar() {

    this.router.navigate(['./estudios/agregar'])
  }

  delete(estudio: Estudio): void {

    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el estudio ${estudio.titulo}?`,
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

        this.estudiosService.delete(estudio.id).subscribe(
          response => {

            this.usuarioService.getUsuario( 1 ).subscribe( (usuario) => this.usuario = usuario );

            swal(
              'Estudio Eliminado!',
              `Estudio ${estudio.titulo} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })

  }

}
