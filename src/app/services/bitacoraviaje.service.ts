import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Bitacora } from '../models/bitacora.model';
@Injectable({
  providedIn: 'root'
})
export class BitacoraviajeService {

  constructor(private http:HttpClient, private authService:AuthService) { }
  readonly URL_API="http://localhost:3000/api/bitacora";
  hacerBitacora(bitacora:Bitacora){
    
    return this.http.post(this.URL_API,bitacora, this.authService.getHeader())
  }

  obtenerBitacoras(sucursal:string){
    return this.http.get(this.URL_API+"/sucursal/"+sucursal,this.authService.getHeader());
  }
  editBitacora(_id:string,sucursal:string){
    return this.http.post(this.URL_API+"/actualizar/"+_id+"/"+sucursal,{},this.authService.getHeader());
  }
}
