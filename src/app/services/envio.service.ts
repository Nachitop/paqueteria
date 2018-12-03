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
  readonly URL_API="api/envio";
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
  
  entradaAlmacen(clave:string,guias:any){
    return this.http.post(this.URL_API+"/entrada/almacen/"+clave,guias,this.authService.getHeader());
  };

  entregaEnvio(_id:string,clave:string,comentario:Comentario){
    return this.http.post(this.URL_API+"/entrega/envio/"+_id+"/"+clave,comentario,this.authService.getHeader());
  };


  enviosPorRecolectar(clave:string,horario:string){
    return this.http.get(this.URL_API+"/obtener/envios/recolectar/"+clave+"/"+horario,this.authService.getHeader());
  }
  obtenerGuiaCompletaById(_id:any){
    return this.http.get(this.URL_API+"/obtener/guia/completa/byid/"+_id);
  }
  entregaEnvioDomicilio(entrega:any){
    return this.http.post(this.URL_API+"/entrega/envio/domicilio",entrega,this.authService.getHeader());
  };

  recoleccionEnvioDomicilio(recoleccion:any){
    return this.http.post(this.URL_API+"/recoleccion/envio/domicilio",recoleccion,this.authService.getHeader());
  };
  
  
 
}
