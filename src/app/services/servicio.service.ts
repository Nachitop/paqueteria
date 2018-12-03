import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Auth} from '../models/auth.model';
import { Servicio } from '../models/servicio.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
 
  selectedServicio:Servicio;
  servicios:Servicio[];
  readonly URL_API='api/servicio'
  constructor(private http:HttpClient,private authService:AuthService) { }

  getServicio(_id:string){
    return this.http.get(this.URL_API+"/"+_id,this.authService.getHeader());
  }
  getServicios(){
    return this.http.get(this.URL_API,this.authService.getHeader());
  }
  getServicioCotizacion(_id:string){
    return this.http.get(this.URL_API+"/cotizacion/servicio/"+_id);
  }
  getServiciosCotizacion(){
    return this.http.get(this.URL_API+"/cotizacion/servicios");
  }
  postServicio(servicio:Servicio){
    return this.http.post(this.URL_API,servicio,this.authService.getHeader());
  }
  putServicio(servicio:Servicio){
    return this.http.put(this.URL_API+"/"+servicio._id,servicio,this.authService.getHeader());
  }
  deleteServicio(_id:string){
    return this.http.delete(this.URL_API+"/"+_id,this.authService.getHeader());
  }

}
