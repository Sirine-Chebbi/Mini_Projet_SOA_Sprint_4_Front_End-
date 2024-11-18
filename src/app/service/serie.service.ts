import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Serie } from '../model/serie.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  series!: Serie[];

  apiURL: string = 'http://localhost:8080/series/api/all';


  constructor(private http: HttpClient) {
  }

  listeSeries(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.apiURL);
  }
}
