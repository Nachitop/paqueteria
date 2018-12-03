import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  readonly URL_API="api/reportes";
  constructor(private http: HttpClient, private authService:AuthService) { }
  reporte1(sucursal:string,desde:string,hasta:string){
  
    return this.http.get(this.URL_API+"/reporte1/"+sucursal+"/"+desde+"/"+hasta, this.authService.getHeader());
  }

  reporte2(sucursal:string,desde:string,hasta:string){
    
    return this.http.get(this.URL_API+"/reporte2/"+sucursal+"/"+desde+"/"+hasta, this.authService.getHeader());
  }
  reporte3(sucursal:string,desde:string,hasta:string){
    
    return this.http.get(this.URL_API+"/reporte3/"+sucursal+"/"+desde+"/"+hasta, this.authService.getHeader());
  }
}
