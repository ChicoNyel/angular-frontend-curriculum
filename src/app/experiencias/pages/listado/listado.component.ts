import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

import { UsuarioService } from 'src/app/usuarios/services/usuario.service';
import { Experiencia, Usuario } from 'src/app/usuarios/usuario';
import { ExperienciasService } from '../../services/experiencias.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html'
})
export class ListadoComponent implements OnInit {

  public usuario: Usuario = new Usuario();
  public experiencia: Experiencia = new Experiencia();

  constructor(  private usuarioService: UsuarioService,
                private experienciasService: ExperienciasService,
                private router: Router ) { }

  ngOnInit(): void {
    this.usuarioService.getUsuario( 1 ).subscribe( (usuario) => this.usuario = usuario );
  }

  agregar() {

    this.router.navigate(['./experiencias/agregar'])
  }

  delete(experiencia: Experiencia): void {

    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la experiencia en ${experiencia.lugar}?`,
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

        this.experienciasService.delete(experiencia.id).subscribe(
          response => {

            this.usuarioService.getUsuario( 1 ).subscribe( (usuario) => this.usuario = usuario );

            swal(
              'Experiencia Eliminada!',
              `Experiencia en ${experiencia.lugar} eliminada con éxito.`,
              'success'
            )
          }
        )

      }
    })

  }

}
