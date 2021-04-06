import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import swal from 'sweetalert2';

import { Experiencia } from 'src/app/usuarios/usuario';

@Injectable({
  providedIn: 'root'
})
export class ExperienciasService {

  private urlEndPoint: string = 'http://localhost:8080/api/experiencias'

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor( private http: HttpClient,
               private router: Router ) { }

  getExperiencia(id: number): Observable<Experiencia> {
    return this.http.get<Experiencia>( `${ this.urlEndPoint }/${ id }` )
        .pipe(
          catchError( e => {
            this.router.navigate(['/experiencias/listado']);
            console.error(e.error.mensaje);
            swal('Error al editar', e.error.mensaje, 'error');
            return throwError(e);
          })
        );
  }

  create(experiencia: Experiencia): Observable<Experiencia> {
    return this.http.post( `${ this.urlEndPoint }/${ 1 }`, experiencia, {headers: this.httpHeaders} )
        .pipe(
          map( (response: any) => response.experiencia as Experiencia ),
          catchError( e => {

            if( e.status == 400 ){
              return throwError(e);
            }

            console.error(e.error.mensaje);
            swal(e.error.mensaje, e.error.error, 'error');
            return throwError(e);
          })
        );
  }

  update(experiencia: Experiencia): Observable<any> {
    return this.http.put<any>( `${ this.urlEndPoint }/${ experiencia.id }`, experiencia, {headers: this.httpHeaders} )
        .pipe(
          catchError( e => {

            if( e.status == 400 ){
              return throwError(e);
            }

            console.error(e.error.mensaje);
            swal(e.error.mensaje, e.error.error, 'error');
            return throwError(e);
          })
        );
  }

  delete(id: number): Observable<Experiencia> {
    return this.http.delete<Experiencia>( `${ this.urlEndPoint }/${ id }`, {headers: this.httpHeaders} )
        .pipe(
          catchError( e => {
            console.error(e.error.mensaje);
            swal(e.error.mensaje, e.error.error, 'error');
            return throwError(e);
          })
        );
  }

}
