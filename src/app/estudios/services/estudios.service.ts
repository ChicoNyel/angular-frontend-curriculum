import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import swal from 'sweetalert2';

import { Estudio } from 'src/app/usuarios/usuario';
import { AuthService } from 'src/app/seguridad/auth.service';


@Injectable({
  providedIn: 'root'
})
export class EstudiosService {

  private urlEndPoint: string = 'http://localhost:8080/api/estudios'

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor( private http: HttpClient,
               private router: Router,
               private authService: AuthService ) { }

  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e): boolean {
    if(e.status==401 || e.status==403){
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  getEstudio(id: number): Observable<Estudio> {
    return this.http.get<Estudio>( `${ this.urlEndPoint }/${ id }`, {headers: this.agregarAuthorizationHeader()} )
        .pipe(
          catchError( e => {

            if(this.isNoAutorizado(e)){
              return throwError(e);
            }

            this.router.navigate(['/estudios/listado']);
            console.error(e.error.mensaje);
            swal('Error al editar', e.error.mensaje, 'error');
            return throwError(e);
          })
        );
  }

  create(estudio: Estudio): Observable<Estudio> {
    return this.http.post( `${ this.urlEndPoint }/${ this.authService.usuario.username }`, estudio, {headers: this.agregarAuthorizationHeader()} )
        .pipe(
          map( (response: any) => response.estudio as Estudio ),
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

  update(estudio: Estudio): Observable<any> {
    return this.http.put<any>( `${ this.urlEndPoint }/${ estudio.id }`, estudio, {headers: this.agregarAuthorizationHeader()} )
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

  delete(id: number): Observable<Estudio> {
    return this.http.delete<Estudio>( `${ this.urlEndPoint }/${ id }`, {headers: this.agregarAuthorizationHeader()} )
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
