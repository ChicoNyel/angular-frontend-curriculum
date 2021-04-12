import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import swal from 'sweetalert2';
import { Persona } from '../usuario';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private urlEndPoint: string = 'http://localhost:8080/api/personas'

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor( private http: HttpClient ) { }

  getPersona(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${ this.urlEndPoint }/${ id }`);
  }

  update(persona: Persona): Observable<any> {
    return this.http.put<any>( `${ this.urlEndPoint }/${ persona.id }`, persona, {headers: this.httpHeaders} )
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

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${ this.urlEndPoint }/upload`, formData, {
      reportProgress: true
    });

    return this.http.request( req );

  }

}
