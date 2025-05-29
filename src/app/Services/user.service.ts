import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly Api = environment.api;
  private readonly EndPoint = "User";
  private readonly Endpoint2 = "active";
  private readonly Endpoint3 = "change/password";
  private readonly Endpoint4 = "validation";

  constructor(private http:HttpClient) { }

  // Obtener un usuario por Id
  public getOneUser(id:string):Observable<any>{
    const url = [this.Api, this.EndPoint, id].join('/');
    const token = localStorage.getItem("token") || "";
    const headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':`Bearer ${token}`});

    return this.http.get(url, {headers}).pipe(
      map(response => (response as any).$value || null),
      catchError(error => {
        console.error('Error al obtener los datos del usuario');
        throw error;
      })
    )
  }

  // Guardar un nuevo usuario
  public postUser(body:any):Observable<any>{
    const url = [this.Api, this.EndPoint].join('/');
    const headers = new HttpHeaders({'Content-Type':'application/json'});

    return this.http.post(url, body, {headers}).pipe(
      map(response => (response as any).$value || null),
      catchError(error =>{
        console.error("Error al guardar los datos del usuario");
        throw error;
      })
    )
  }

  // Actualizar datos de usuario
  public putUser(body:any):Observable<any>{
    const url = [this.Api, this.EndPoint].join('/');
    const token = localStorage.getItem("token") || null;
    const headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':`Bearer ${token}`});

    return this.http.put(url, body, {headers}).pipe(
      map(response =>(response as any).$value || null),
      catchError(error => {
        console.error("Error al actualizar los datos del cliente");
        throw error;
      })
    )
  }

  // Desactivar cuenta de usuario o  eliminado lógico
  public activeUser(body:any):Observable<any>{
    const url = [this.Api, this.EndPoint, this.Endpoint2].join('/');
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':`Bearer ${token}`});

    return this.http.put(url, body, {headers}).pipe(
      map(response => (response as any).$value || null),
      catchError(error => {
        console.error("Error al desactivar o activar usuario");
        throw error;
      })
    )
  }

  // Cambiar contraseña 
  public changePassWord(body:any):Observable<any>{
    const url = [this.Api, this.EndPoint, this.Endpoint3].join('/');
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    
    return this.http.put(url, body, {headers}).pipe(
      map(response => (response as any).$value || null),
      catchError(error => {
        console.error("error al cambiar la contraseña");
        throw error;
      })
    )
  }

  // Validar usuario
  public validateUser(body:any):Observable<any>{
    const url = [this.Api, this.EndPoint, this.Endpoint4].join('/');
    const headers = new HttpHeaders({'Content-Type':'application/json'});

    return this.http.post(url, body, {headers}).pipe(
      map(response => (response as any).$value || null),
      catchError(error => {
        console.error("Error de validación de usuario");
        throw error;
      })
    )
  }
}
