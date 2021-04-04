import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint: string = 'http://localhost:8080/api/usuarios'

  constructor( private http: HttpClient ) { }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${ this.urlEndPoint }/${ id }`);
  }

}
