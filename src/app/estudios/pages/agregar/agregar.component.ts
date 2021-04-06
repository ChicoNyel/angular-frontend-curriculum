import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import swal from 'sweetalert2';

import { Estudio } from 'src/app/usuarios/usuario';
import { EstudiosService } from '../../services/estudios.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html'
})
export class AgregarComponent implements OnInit {

  public estudio: Estudio = new Estudio();

  public errores: string[];

  constructor( private estudioService: EstudiosService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.cargarConocimiento();
  }

  cargarConocimiento(): void {
    this.activatedRoute.params.subscribe( params => {
      let id = params['id']
      if( id ){
        this.estudioService.getEstudio( id ).subscribe(
          (estudio) => this.estudio = estudio
        )
      }
    })
  }

  create(): void {

    this.estudioService.create( this.estudio )
      .subscribe( estudio => {
        this.router.navigate(['/estudios/listado'])
        swal('Nuevo estudio', `El estudio ${ estudio.titulo } ha sido agregado con éxito`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
      );

  }

  update(): void {

    this.estudioService.update( this.estudio )
      .subscribe( json => {
        this.router.navigate(['/estudios/listado'])
        swal('Estudio Actualizado', `${ json.mensaje } : ${ json.estudio.titulo }`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
      );

  }

}
