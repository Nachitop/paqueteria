import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Horarios } from '../models/horarios.model';
@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  constructor(private http:HttpClient) { }
  horarios:Horarios[];
  readonly URL_API="api/horarios"
  getHorarios(){
    return this.http.get(this.URL_API);
  }
}
