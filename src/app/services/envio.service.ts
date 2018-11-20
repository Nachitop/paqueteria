import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Cotizacion } from '../models/cotizacion.model';
import { Comentario } from '../models/comentarios';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class EnvioService {

  constructor(private http:HttpClient, private authService:AuthService) { }
  readonly URL_API="http://localhost:3000/api/envio";
  hacerEnvio(cotizacion:Cotizacion){
    return this.http.post(this.URL_API,cotizacion);
  }

  cancelarEnvio(guia:any,clave:any){
    return this.http.get(this.URL_API+"/cancelar/guia/"+guia+"/"+clave);
  }

  obtenerGuia(guia:any){
    return this.http.get(this.URL_API+"/obtener/guia/"+guia);
  }

  obtenerGuiaCompleta(guia:any){
    return this.http.get(this.URL_API+"/obtener/guia/completa/"+guia);
  }
  
  entradaAlmacen(_id:string,clave:string,comentario:Comentario){
    console.log(comentario);
    return this.http.post(this.URL_API+"/entrada/almacen/"+_id+"/"+clave,comentario,this.authService.getHeader());
  };
}
