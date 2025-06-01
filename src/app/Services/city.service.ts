import { Injectable } from '@angular/core';
import { City } from '../Models/city';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError} from 'rxjs';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class CityService {

 private readonly Api = environment.api;
  private readonly EndPoint = "City";

  constructor(private http:HttpClient) { }

  public getAllTypeDocument():Observable<City>{
    const url = [this.Api, this.EndPoint].join('/');
    const token = localStorage.getItem("token") || null;
    const headers = new HttpHeaders({'Content-Type':'application/json', 'Authorization':`Bearer ${token}`});

    return this.http.get<any>(url, {headers}).pipe(
      map(response=> {
        const data = response?.$value || response;
        return data;
      }),
      catchError(error => {
        console.error("Error al obtener los datos");
        throw error;
      }) 
    )
  }
}
