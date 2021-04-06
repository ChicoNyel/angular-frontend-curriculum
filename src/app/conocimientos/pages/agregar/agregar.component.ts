import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import swal from 'sweetalert2';

import { Conocimiento } from 'src/app/usuarios/usuario';
import { ConocimientosService } from '../../services/conocimientos.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html'
})
export class AgregarComponent implements OnInit {

  public conocimiento: Conocimiento = new Conocimiento();

  public errores: string[];

  constructor( private conocimientoService: ConocimientosService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.cargarConocimiento();
  }

  cargarConocimiento(): void {
    this.activatedRoute.params.subscribe( params => {
      let id = params['id']
      if( id ){
        this.conocimientoService.getConocimiento( id ).subscribe(
          (conocimiento) => this.conocimiento = conocimiento
        )
      }
    })
  }

  create(): void {

    this.conocimientoService.create( this.conocimiento )
      .subscribe( conocimiento => {
        this.router.navigate(['/conocimientos/listado'])
        swal('Nuevo conocimiento', `El conocimiento ${ conocimiento.descripcion } ha sido agregado con éxito`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
      );

  }

  update(): void {

    this.conocimientoService.update( this.conocimiento )
      .subscribe( json => {
        this.router.navigate(['/conocimientos/listado'])
        swal('Conocimiento Actualizado', `${ json.mensaje } : ${ json.conocimiento.descripcion }`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
      );

  }

}
