import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Person } from '../Models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private readonly APi = environment.api;
  private readonly EndPoint ="Person";

  constructor(private http:HttpClient) { }

  // Obtener los datos de todas las personas
  public getAllData():Observable<Person[]>{
    const url = [this.APi, this.EndPoint].join('/');
    const token =  localStorage.getItem("token") || "";
    const headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':`Bearer ${token}`});

    return this.http.get<any>(url, {headers}).pipe(
      map(response => {
        const data = response?.$value ?? response;
        return data;
      }),
      catchError(error => {
        console.error('Error al obtener los datos', error); 
        throw error;
      } )
    )
  }

  // Obtener los datos de una persona
  public getOneData(id:number):Observable<Person>{
    const url = [this.APi, this.EndPoint, id].join('/');
    const token =  localStorage.getItem("token") || "";
    const headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':`Bearer ${token}`});

    console.log("los datos del servicio son: ", id, token, url);
    return this.http.get<any>(url, {headers}).pipe(
      map(response => {
        const data = response?.$value ?? response;
        return data;
      }),
      catchError(error => {
        console.error('Error al obtener los datos', error); 
        throw error;
      } )
    )
  }

  // Guardar los datos de una persona
  public postData(data:any):Observable<Person>{
    const url = [this.APi, this.EndPoint].join('/');
    const headers = new HttpHeaders({'Content-Type':'application/json'});

    return this.http.post<any>(url, data, {headers}).pipe(
      map(response => {
        const data = response?.$value ?? response;
        return data;
      }),
      catchError(error => {
        console.error("Error al guardar los datos", error); 
        throw error;})
    )
  }

  // Actualizar los datos de una persona
  public putData(data:any):Observable<Person>{
    const url = [this.APi, this.EndPoint].join('/');
    const token =  localStorage.getItem("token") || "";
    const headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':`Bearer ${token}`});

    return this.http.put<any>(url, data, {headers}).pipe(
      map(response => {
        const data = response?.$value ?? response;
        return data;
      }),
      catchError(error => {
        console.error('Error al actualizar los datos');
        throw error;
      })
    )
  }
}
