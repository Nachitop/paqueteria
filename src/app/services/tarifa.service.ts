import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Auth } from '../models/auth.model';
import {Tarifa} from '../models/tarifa.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TarifaService {

  constructor(private http:HttpClient,private authService:AuthService) { }
  readonly URL_API='api/tarifa'
  selectedTarifa:Tarifa;
  tarifas:Tarifa[];

  getTarifa(_id:string){
    return this.http.get(this.URL_API+"/"+_id,this.authService.getHeader())
  }

  getTarifas(){
    return this.http.get(this.URL_API,this.authService.getHeader());
  }

  postTarifa(tarifa:Tarifa){
    return this.http.post(this.URL_API,tarifa,this.authService.getHeader());
  }

  putTarifa(tarifa:Tarifa){
    return this.http.put(this.URL_API+"/"+tarifa._id,tarifa,this.authService.getHeader());
  }

  deleteTarifa(_id:string){
    return this.http.delete(this.URL_API+"/"+_id,this.authService.getHeader());
  }

  cotizar(cotizacion:any){
    return this.http.post(this.URL_API+"/cotizar",cotizacion);
  }



}
