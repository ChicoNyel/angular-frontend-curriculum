import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import swal from 'sweetalert2';

import { Usuario } from '../usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint: string = 'http://localhost:8080/api/usuarios'

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor( private http: HttpClient ) { }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${ this.urlEndPoint }/${ id }`);
  }

  update(usuario: Usuario): Observable<any> {
    return this.http.put<any>( `${ this.urlEndPoint }/${ usuario.id }`, usuario, {headers: this.httpHeaders} )
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
