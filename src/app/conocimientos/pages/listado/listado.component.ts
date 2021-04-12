import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

import { PersonaService } from 'src/app/usuarios/services/persona.service';
import { Conocimiento, Persona } from 'src/app/usuarios/usuario';
import { ConocimientosService } from '../../services/conocimientos.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html'
})
export class ListadoComponent implements OnInit {

  public persona: Persona = new Persona();
  public conocimiento: Conocimiento = new Conocimiento();

  constructor(  private personaService: PersonaService,
                private conocimientoService: ConocimientosService,
                private router: Router ) { }

  ngOnInit(): void {
    this.personaService.getPersona( 1 ).subscribe( (persona) => this.persona = persona );
  }

  agregar() {

    this.router.navigate(['./conocimientos/agregar'])
  }

  delete(conocimiento: Conocimiento): void {

    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el conocimiento ${conocimiento.tecnologia.nombre}?`,
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

            this.personaService.getPersona( 1 ).subscribe( (persona) => this.persona = persona );

            swal(
              'Conocimiento Eliminado!',
              `Conocimiento ${conocimiento.tecnologia.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    })

  }

}
