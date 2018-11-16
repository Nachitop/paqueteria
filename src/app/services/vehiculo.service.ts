import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Auth} from '../models/auth.model';
import {Vehiculo} from '../models/vehiculo.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
 
  constructor(private http:HttpClient, private authService:AuthService) { }
  readonly URL_API='http://localhost:3000/api/vehiculo'
  selectedVehiculo:Vehiculo;
  vehiculos:Vehiculo[];

  getVehiculo(_id:string){
    return this.http.get(this.URL_API+"/"+_id,this.authService.getHeader());
  }

  getVehiculos(){
    return this.http.get(this.URL_API,this.authService.getHeader());

  }

  postVehiculo(vehiculo:Vehiculo){
    return this.http.post(this.URL_API,vehiculo,this.authService.getHeader());
  }
  putVehiculo(vehiculo:Vehiculo){
    return this.http.put(this.URL_API+"/"+vehiculo._id,vehiculo,this.authService.getHeader())
  }
  deleteVehiculo(_id:string){
    return this.http.delete(this.URL_API+"/"+_id,this.authService.getHeader());
  }

  validarMatricula(matricula:string){
    return this.http.get(this.URL_API+"/matricula/"+matricula,this.authService.getHeader());
  }
}
