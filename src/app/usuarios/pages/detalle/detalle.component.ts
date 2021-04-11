import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../usuario';

@Component({
  selector: 'detalle-usuario',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit {

  usuario: Usuario;
  fotoSeleccionada: File;
  progreso: number = 0;

  constructor( private usuarioService: UsuarioService,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let id: number = +params.get('id');
      if(id){
        this.usuarioService.getUsuario(id).subscribe( usuario => {
          this.usuario = usuario;
        });
      }
    })
  }

  seleccionarFoto( event ) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
      swal('Error seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto(){

    if(!this.fotoSeleccionada){

      swal('Error Upload: ', 'Debe seleccionar una foto', 'error');

    } else {

      this.usuarioService.subirFoto( this.fotoSeleccionada, this.usuario.id )
      .subscribe( event => {

        if(event.type === HttpEventType.UploadProgress){

          this.progreso = Math.round(( event.loaded / event.total) * 100);

        } else if(event.type === HttpEventType.Response){

          let response: any = event.body;
          this.usuario = response.usuario as Usuario;

          swal('La foto se ha subido completamente!', response.mensaje, 'success');

        }

      });

    }
  }

}
