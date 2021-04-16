import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import swal from 'sweetalert2';

import { Persona } from '../usuario';
import { AuthService } from 'src/app/seguridad/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private urlEndPoint: string = 'http://localhost:8080/api/personas'

  //private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor( private http: HttpClient,
               private router: Router,
               private authService: AuthService ) { }

  /*
  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }
  */

  /*
  private isNoAutorizado(e): boolean {

    if(e.status==401){

      if(this.authService.isAuthenticated()){
        this.authService.logout();
      }

      this.router.navigate(['/login']);
      return true;
    }

    if(e.status==403){
      swal('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/personas/listado']);
      return true;
    }

    return false;
  }
  */

  getPersona(id: number): Observable<Persona> {

    //return this.http.get<Persona>(`${ this.urlEndPoint }/${ id }`, {headers: this.agregarAuthorizationHeader()} ).pipe(
    return this.http.get<Persona>(`${ this.urlEndPoint }/${ id }` )
    /*
    .pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
    */
  }

  getPersonaByUsername(username: string): Observable<Persona> {

    //return this.http.get<Persona>(`${ this.urlEndPoint }/showByUsername/${ username }`, {headers: this.agregarAuthorizationHeader()} ).pipe(
    return this.http.get<Persona>(`${ this.urlEndPoint }/showByUsername/${ username }` )
    /*
    .pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
    */
  }

  update(persona: Persona): Observable<any> {
    //return this.http.put<any>( `${ this.urlEndPoint }/${ persona.id }`, persona, {headers: this.agregarAuthorizationHeader()} )
    return this.http.put<any>( `${ this.urlEndPoint }/${ persona.id }`, persona )
        .pipe(
          catchError( e => {

            /*
            if(this.isNoAutorizado(e)){
              return throwError(e);
            }
            */

            if( e.status == 400 ){
              return throwError(e);
            }

            if(e.error.mensaje){
              console.error(e.error.mensaje);
            }
            //swal(e.error.mensaje, e.error.error, 'error');
            return throwError(e);
          })
        );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    /*
    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;

    if(token != null){
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    */

    const req = new HttpRequest('POST', `${ this.urlEndPoint }/upload`, formData, {
      reportProgress: true
      //headers: httpHeaders
    });

    return this.http.request( req )
    /*
    .pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
    */
  }

}
