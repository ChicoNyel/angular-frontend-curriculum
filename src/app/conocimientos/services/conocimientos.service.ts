import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import swal from 'sweetalert2';

import { Conocimiento, Tecnologia } from 'src/app/usuarios/usuario';

@Injectable({
  providedIn: 'root'
})
export class ConocimientosService {

  private urlEndPoint: string = 'http://localhost:8080/api/conocimientos'

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor( private http: HttpClient,
               private router: Router ) { }

  private isNoAutorizado(e): boolean {
    if(e.status==401 || e.status==403){
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  getTecnologias(): Observable<Tecnologia[]> {
    return this.http.get<Tecnologia[]>(this.urlEndPoint + '/tecnologias').pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getConocimiento(id: number): Observable<Conocimiento> {
    return this.http.get<Conocimiento>( `${ this.urlEndPoint }/${ id }` )
        .pipe(
          catchError( e => {

            if(this.isNoAutorizado(e)){
              return throwError(e);
            }

            this.router.navigate(['/conocimientos/listado']);
            console.error(e.error.mensaje);
            swal('Error al editar', e.error.mensaje, 'error');
            return throwError(e);
          })
        );
  }

  create(conocimiento: Conocimiento): Observable<Conocimiento> {
    return this.http.post( `${ this.urlEndPoint }/${ 1 }`, conocimiento, {headers: this.httpHeaders} )
        .pipe(
          map( (response: any) => response.conocimiento as Conocimiento ),
          catchError( e => {

            if(this.isNoAutorizado(e)){
              return throwError(e);
            }

            if( e.status == 400 ){
              return throwError(e);
            }

            console.error(e.error.mensaje);
            swal(e.error.mensaje, e.error.error, 'error');
            return throwError(e);
          })
        );
  }

  update(conocimiento: Conocimiento): Observable<any> {
    return this.http.put<any>( `${ this.urlEndPoint }/${ conocimiento.id }`, conocimiento, {headers: this.httpHeaders} )
        .pipe(
          catchError( e => {

            if(this.isNoAutorizado(e)){
              return throwError(e);
            }

            if( e.status == 400 ){
              return throwError(e);
            }

            console.error(e.error.mensaje);
            swal(e.error.mensaje, e.error.error, 'error');
            return throwError(e);
          })
        );
  }

  delete(id: number): Observable<Conocimiento> {
    return this.http.delete<Conocimiento>( `${ this.urlEndPoint }/${ id }`, {headers: this.httpHeaders} )
        .pipe(
          catchError( e => {

            if(this.isNoAutorizado(e)){
              return throwError(e);
            }

            console.error(e.error.mensaje);
            swal(e.error.mensaje, e.error.error, 'error');
            return throwError(e);
          })
        );
  }

}
