import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private readonly APi = environment.api;
  private readonly EndPoint ="Person";

  constructor(private http:HttpClient) { }

  // Obtener los datos de todas las personas
  public getAllData():Observable<any>{
    const url = [this.APi, this.EndPoint].join('/');
    const token =  localStorage.getItem("token") || "";
    const headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':`Bearer ${token}`});

    return this.http.get(url, {headers}).pipe(
      map(response => (response as any).$value || []),
      catchError(error => {
        console.error('Error al obtener los datos', error); 
        throw error;
      } )
    )
  }

  // Obtener los datos de una persona
  public getOneData(Id:number):Observable<any>{
    const url = [this.APi, this.EndPoint, Id].join('/');
    const token =  localStorage.getItem("token") || "";
    const headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':`Bearer ${token}`});

    return this.http.get(url, {headers}).pipe(
      map(response => (response as any).$value || null),
      catchError(error => {
        console.error('Error al obtener los datos', error); 
        throw error;
      } )
    )
  }

  // Guardar los datos de una persona
  public postData(data:any):Observable<any>{
    const url = [this.APi, this.EndPoint].join('/');
    const headers = new HttpHeaders({'Content-Type':'application/json'});

    return this.http.post(url, data, {headers}).pipe(
      map(response => (response as any).$value || null),
      catchError(error => {
        console.error("Error al guardar los datos", error); 
        throw error;})
    )
  }

  // Actualizar los datos de una persona
  public putData(data:any):Observable<any>{
    const url = [this.APi, this.EndPoint].join('/');
    const token =  localStorage.getItem("token") || "";
    const headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':`Bearer ${token}`});

    return this.http.put(url, data, {headers}).pipe(
      map(response => (response as any).$value || null),
      catchError(error => {
        console.error('Error al actualizar los datos');
        throw error;
      })
    )
  }
}
