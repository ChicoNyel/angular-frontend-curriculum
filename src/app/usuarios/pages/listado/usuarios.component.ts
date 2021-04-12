import { Component, OnInit } from '@angular/core';

import { ModalService } from '../../services/modal.service';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  public persona: Persona = new Persona();
  personaSeleccionado: Persona;

  constructor( private personaService: PersonaService,
               private modalService: ModalService ) { }

  ngOnInit(): void {

    this.personaService.getPersona( 1 ).subscribe( (persona) => this.persona = persona );

    this.modalService.notificarUpload.subscribe( persona => {
      this.persona = persona;
    })

  }

  abrirModal(persona: Persona){
    this.personaSeleccionado = persona;
    this.modalService.abrirModal();
  }

}
