import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { CP } from '../models/cp.model';


@Injectable({
  providedIn: 'root'
})
export class CpService {
  
//   api=[{
//     cp:"81257",
//     colonias:[
//       "Tabachines",
//       "Villa Owen"
//     ],
//     municipio:"Ahome",
//     estado:"Sinaloa"
//   },{
//     cp:"81259",
//     colonias:[
//       "Del parque"
//     ],
//     municipio:"Ahome",
//     estado:"Sinaloa"
//   },
//   {
//     cp:"81260",
//     colonias:[
//       "Rosengo G. Castro",
//       "Las Mañanitas"
//     ],
//     municipio:"Ahome",
//     estado:"Sinaloa"
//   },{
//     cp:"81271",
//     colonias:[
//       "Portal de hierro",
//       "Álamos Country"
//     ],
//     municipio:"Ahome",
//     estado:"Sinaloa"
//   }
// ]
  readonly url_ap="https://api-codigos-postales.herokuapp.com/v2/codigo_postal/";
 
  constructor(private http: HttpClient) { }
  info_cpOrigen:CP= new CP;
  info_cpDestino:CP= new CP;
  obtenerCP(cp:any){
    console.log(this.url_ap+cp);
 return this.http.get(this.url_ap+cp)
  //   let cp2=this.api.filter(value=>value.cp===cp);
  //   console.log(cp2[0]);
  //   return Promise.resolve({
  //     cp: cp2[0]
  // });
  
}
}
