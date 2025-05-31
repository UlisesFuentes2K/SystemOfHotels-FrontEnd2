import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from '../Models/user';

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
  public getOneUser(id:string):Observable<User>{
    const url = [this.Api, this.EndPoint, id].join('/');
    const token = localStorage.getItem("token") || "";
    const headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':`Bearer ${token}`});

    return this.http.get<any>(url, {headers}).pipe(
      map(response => {
              const data = response?.$value ?? response;
              return data;
            }),
      catchError(error => {
        console.error('Error al obtener los datos del usuario');
        throw error;
      })
    )
  }

  // Guardar un nuevo usuario
  public postUser(body:any):Observable<User>{
    const url = [this.Api, this.EndPoint].join('/');
    const headers = new HttpHeaders({'Content-Type':'application/json'});

    return this.http.post<any>(url, body, {headers}).pipe(
      map(response => {
        const data = response?.$value ?? response;
        return data;
      }),
      catchError(error =>{
        console.error("Error al guardar los datos del usuario");
        throw error;
      })
    )
  }

  // Actualizar datos de usuario
  public putUser(body:any):Observable<User>{
    const url = [this.Api, this.EndPoint].join('/');
    const token = localStorage.getItem("token") || null;
    const headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':`Bearer ${token}`});

    return this.http.put<any>(url, body, {headers}).pipe(
      map(response => {
        const data = response?.$value ?? response;
        return data;
      }),
      catchError(error => {
        console.error("Error al actualizar los datos del cliente");
        throw error;
      })
    )
  }

  // Desactivar cuenta de usuario o  eliminado lógico
  public activeUser(body:any):Observable<boolean>{
    const url = [this.Api, this.EndPoint, this.Endpoint2].join('/');
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':`Bearer ${token}`});

    return this.http.put<any>(url, body, {headers}).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        console.error("Error al desactivar o activar usuario", error);
        return of(false);
      })
    )
  }

  // Cambiar contraseña 
  public changePassWord(body:any):Observable<boolean>{
    const url = [this.Api, this.EndPoint, this.Endpoint3].join('/');
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    
    return this.http.put<any>(url, body, {headers}).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        console.error("error al cambiar la contraseña", error);
        return of(false);
      })
    )
  }

  // Validar usuario
  public validateUser(body:any):Observable<boolean>{
    const url = [this.Api, this.EndPoint, this.Endpoint4].join('/');
    const headers = new HttpHeaders({'Content-Type':'application/json'});

    return this.http.post<any>(url, body, {headers}).pipe(
      map(response => {
        const data = response?.$value || response;
        if(data.idTypePerson !== 2){
            return false;
        }
        const rol = data.rol[0];
        this.storeUserData(data.token, data.userId, data.idPerson, rol);
        return !!data.token;
      }),
      catchError(error => {
        console.error("Error de validación de usuario", error);
        return of(false);
      })
    )
  }

  // Guardar datos de usuario en storage
  private storeUserData(token: string, Id: string, IdPerson:number, rol:any): void {
  localStorage.setItem("token", token);
  localStorage.setItem("Id", Id);
  localStorage.setItem("rol", rol.toString());
  localStorage.setItem("idPerson", IdPerson.toString());
  }
}
