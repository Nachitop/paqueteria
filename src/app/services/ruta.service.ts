import { Injectable } from '@angular/core';
import  {HttpClient} from '@angular/common/http';  
import { Auth } from '../models/auth.model';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class RutaService {
  auth:Auth
  constructor(private http :HttpClient, private authService:AuthService) { }
  readonly URL_API="api/ruta";

  obtenerRutas(tipoRuta:string){
    return this.http.get(this.URL_API+"/"+tipoRuta, this.authService.getHeader());
  }
}
