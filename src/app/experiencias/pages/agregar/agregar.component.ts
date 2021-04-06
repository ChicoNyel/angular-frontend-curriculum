import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import swal from 'sweetalert2';

import { Experiencia } from 'src/app/usuarios/usuario';
import { ExperienciasService } from '../../services/experiencias.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html'
})
export class AgregarComponent implements OnInit {

  public experiencia: Experiencia = new Experiencia();

  public errores: string[];

  constructor( private experienciaService: ExperienciasService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.cargarConocimiento();
  }

  cargarConocimiento(): void {
    this.activatedRoute.params.subscribe( params => {
      let id = params['id']
      if( id ){
        this.experienciaService.getExperiencia( id ).subscribe(
          (experiencia) => this.experiencia = experiencia
        )
      }
    })
  }

  create(): void {

    this.experienciaService.create( this.experiencia )
      .subscribe( experiencia => {
        this.router.navigate(['/experiencias/listado'])
        swal('Nueva Experiencia', `La experiencia ${ experiencia.descripcion } ha sido agregado con éxito`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
      );

  }

  update(): void {

    this.experienciaService.update( this.experiencia )
      .subscribe( json => {
        this.router.navigate(['/experiencias/listado'])
        swal('Experiencia Actualizada', `${ json.mensaje } : ${ json.experiencia.descripcion }`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
      );

  }

}
