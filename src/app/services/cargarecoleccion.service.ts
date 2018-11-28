import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class CargarecoleccionService {

  constructor(private http:HttpClient, private authService:AuthService) { }
  readonly URL_API="http://localhost:3000/api/cargarecoleccion";
  hacerCargaRecoleccion(carga:any){
    
    return this.http.post(this.URL_API,carga, this.authService.getHeader());
  }
  obtenerCargaRecoleccion(empleado:string){
    return this.http.get(this.URL_API+"/"+empleado,this.authService.getHeader());
  }
  obtenerCargasRecoleccion(sucursal:string){
    return this.http.get(this.URL_API+"/sucursal/"+sucursal,this.authService.getHeader());
  }

  editCargasRecoleccion(_id:string){
    return this.http.post(this.URL_API+"/actualizar/"+_id,{},this.authService.getHeader());
  }
}
