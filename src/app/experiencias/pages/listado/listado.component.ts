import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

import { PersonaService } from 'src/app/usuarios/services/persona.service';
import { Experiencia, Persona } from 'src/app/usuarios/usuario';
import { ExperienciasService } from '../../services/experiencias.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html'
})
export class ListadoComponent implements OnInit {

  public persona: Persona = new Persona();
  public experiencia: Experiencia = new Experiencia();

  constructor(  private personaService: PersonaService,
                private experienciasService: ExperienciasService,
                private router: Router ) { }

  ngOnInit(): void {
    this.personaService.getPersona( 1 ).subscribe( (persona) => this.persona = persona );
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

            this.personaService.getPersona( 1 ).subscribe( (persona) => this.persona = persona );

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
