import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Sucursal } from '../models/sucursal';
import { Auth } from '../models/auth.model';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class SucursalService {
 

  
  constructor(private http:HttpClient, private authService:AuthService) {
    
   }
  
  
  selectedSucursal: Sucursal= new Sucursal();
  sucursales: Sucursal [];
  readonly URL_API='http://localhost:3000/api/sucursal'
  


  getSucursales(){
   
    return this.http.get(this.URL_API, this.authService.getHeader());
    
  }

  getSucursal(_id:string){
    return this.http.get(this.URL_API+"/"+_id, this.authService.getHeader())
  }
  postSucursal(sucursal:Sucursal){
    console.log(sucursal);
    return this.http.post(this.URL_API,sucursal,this.authService.getHeader());
  }

  putSucursal(sucursal:Sucursal){
    return this.http.put(this.URL_API+  `/${sucursal._id} `,sucursal,this.authService.getHeader())
  }

  deleteSucursal(_id:string){
    return this.http.delete(this.URL_API+ ` /${_id}`,this.authService.getHeader());
  }

  validarSucursal(clave:string){
    return this.http.get(this.URL_API+"/sucursal/"+clave);
  }
 
}
