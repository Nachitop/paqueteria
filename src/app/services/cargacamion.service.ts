import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class CargacamionService {

  constructor(private http:HttpClient, private authService:AuthService) { }
  readonly URL_API="api/carga";
  hacerCargaCamion(carga:any){
    
    return this.http.post(this.URL_API,carga, this.authService.getHeader())
  }

  obtenerCargaCamion(empleado:string){
    return this.http.get(this.URL_API+"/"+empleado,this.authService.getHeader())
  }

  obtenerCargasCamion(sucursal:string){
    return this.http.get(this.URL_API+"/sucursal/"+sucursal,this.authService.getHeader());
  }
  editCargaCamion(_id:string){
    return this.http.post(this.URL_API+"/actualizar/"+_id,{},this.authService.getHeader());
  }
}
