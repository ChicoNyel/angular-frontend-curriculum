import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import swal from 'sweetalert2';

import { PersonaService } from 'src/app/usuarios/services/persona.service';
import { Estudio, Persona } from 'src/app/usuarios/usuario';
import { EstudiosService } from '../../services/estudios.service';
import { AuthService } from 'src/app/seguridad/auth.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html'
})
export class ListadoComponent implements OnInit {

  public persona: Persona = new Persona();
  public estudio: Estudio = new Estudio();

  constructor(  private personaService: PersonaService,
                private estudiosService: EstudiosService,
                public authService: AuthService,
                private router: Router ) { }

  ngOnInit(): void {
    this.personaService.getPersonaByUsername( this.authService.usuario.username ).subscribe( (persona) => this.persona = persona );
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

            this.personaService.getPersonaByUsername( this.authService.usuario.username ).subscribe( (persona) => this.persona = persona );

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
