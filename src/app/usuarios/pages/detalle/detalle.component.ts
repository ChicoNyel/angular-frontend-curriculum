import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

import swal from 'sweetalert2';
import { ModalService } from '../../services/modal.service';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../usuario';

@Component({
  selector: 'detalle-usuario',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() usuario: Usuario;

  fotoSeleccionada: File;
  progreso: number = 0;

  constructor( private usuarioService: UsuarioService,
               public modalService: ModalService ) { }

  ngOnInit(): void {

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

          this.modalService.notificarUpload.emit(this.usuario);

          swal('La foto se ha subido completamente!', response.mensaje, 'success');

        }

      });

    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

}
