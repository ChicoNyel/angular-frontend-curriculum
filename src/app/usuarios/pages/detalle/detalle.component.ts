import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

import swal from 'sweetalert2';
import { ModalService } from '../../services/modal.service';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../usuario';

@Component({
  selector: 'detalle-usuario',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() persona: Persona;

  fotoSeleccionada: File;
  progreso: number = 0;

  constructor( private personaService: PersonaService,
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

      this.personaService.subirFoto( this.fotoSeleccionada, this.persona.id )
      .subscribe( event => {

        if(event.type === HttpEventType.UploadProgress){

          this.progreso = Math.round(( event.loaded / event.total) * 100);

        } else if(event.type === HttpEventType.Response){

          let response: any = event.body;
          this.persona = response.persona as Persona;

          this.modalService.notificarUpload.emit(this.persona);

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
