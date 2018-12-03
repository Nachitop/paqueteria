import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { CP } from '../models/cp.model';


@Injectable({
  providedIn: 'root'
})
export class CpService {
  
 // readonly url_ap="https://api-codigos-postales.herokuapp.com/v2/codigo_postal/";
 readonly url_ap="http://35.185.216.89/getCP.php?cp=";
  constructor(private http: HttpClient) { }
  info_cpOrigen:CP= new CP;
  info_cpDestino:CP= new CP;
  obtenerCP(cp:any){
    console.log(this.url_ap+cp);
 return this.http.get(this.url_ap+cp)

  
}
}
