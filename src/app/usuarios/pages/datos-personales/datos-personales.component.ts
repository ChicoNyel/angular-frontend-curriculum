import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import swal from 'sweetalert2';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../usuario';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styles: [
  ]
})
export class DatosPersonalesComponent implements OnInit {

  public persona: Persona = new Persona();

  public errores: string[];

  constructor( private personaService: PersonaService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.cargarPersona();
  }

  cargarPersona(): void {
    this.activatedRoute.params.subscribe( params => {
      let id = params['id']
      if( id ){
        this.personaService.getPersona( id ).subscribe(
          (persona) => this.persona = persona
        )
      }
    })
  }

  update(): void {

    this.personaService.update( this.persona )
      .subscribe( json => {
        this.router.navigate(['/usuarios/listado'])
        swal('Persona Actualizado', `${ json.mensaje } : ${ json.persona.primerNombre }`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
      );

  }

}
