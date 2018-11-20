import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Empleado } from '../models/empleado';
import { Login } from '../models/login.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  selectedEmpleado:Empleado= new Empleado();
  empleados:Empleado[];
  readonly URL_API="http://localhost:3000/api/empleado"

  getEmpleado(_id:string){
    return this.http.get(this.URL_API+`/${_id} `,this.authService.getHeader());
  }
  getEmpleadoos(){
    return this.http.get(this.URL_API,this.authService.getHeader());
  }

  createEmpleado(empleado:Empleado){
    return this.http.post(this.URL_API,empleado,this.authService.getHeader());
  }
  updateEmpleado(empleado:Empleado){
    return this.http.put(this.URL_API+`/${empleado._id} `,empleado,this.authService.getHeader());
  }

  deleteEmpleado(_id:string){
    return this.http.delete(this.URL_API+`/${_id} `,this.authService.getHeader());
  }

  validarEmail(email:string){
    return this.http.get(this.URL_API+"/email/"+email)
  }

  validarCurp(curp:string){
    return this.http.get(this.URL_API+"/curp/"+curp)
  }
  validarRfc(rfc:string){
    return this.http.get(this.URL_API+"/rfc/"+rfc)
  }
  validarNss(nss:string){
    return this.http.get(this.URL_API+"/nss/"+nss)
  }

  login(login:Login){
    return this.http.post(this.URL_API+"/login/",login);
  }

 

}
