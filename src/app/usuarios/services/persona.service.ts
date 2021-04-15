import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import swal from 'sweetalert2';
import { Persona } from '../usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private urlEndPoint: string = 'http://localhost:8080/api/personas'

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

  getPersona(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${ this.urlEndPoint }/${ id }`).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  update(persona: Persona): Observable<any> {
    return this.http.put<any>( `${ this.urlEndPoint }/${ persona.id }`, persona, {headers: this.httpHeaders} )
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

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${ this.urlEndPoint }/upload`, formData, {
      reportProgress: true
    });

    return this.http.request( req ).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );

  }

}
