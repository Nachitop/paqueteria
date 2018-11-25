import { Component, OnInit } from '@angular/core';
import { EnvioService } from 'src/app/services/envio.service';
import { Envio } from 'src/app/models/envio';
import { Cotizacion } from 'src/app/models/cotizacion.model';
import { CpService } from 'src/app/services/cp.service';
import { CP } from 'src/app/models/cp.model';


@Component({
  selector: 'app-rastreo',
  templateUrl: './rastreo.component.html',
  styleUrls: ['./rastreo.component.css']
})
export class RastreoComponent implements OnInit {
  guia:string;
  envio:Envio;
  cotizacion:Cotizacion=new Cotizacion();
  dimensiones:any;
  origen:string="";
  destino:string="";
  servicios:string="";
  mensaje:string="";
  constructor(private envioService:EnvioService, private cpService:CpService) { }

  ngOnInit() {
  }

  rastrearGuia(){
    this.servicios="";
    this.envioService.obtenerGuiaCompleta(this.guia).subscribe(res=>{
      this.envio=res as Envio;
     
      if(this.envio!=undefined && this.envio!=null){
        console.log("entré");
        this.obtenerDimensiones();
        this.obtenerCiudades();
        this.obtenerServicios();
        this.guia="";
      }else{
        console.log("entré 2");
        this.mensaje="No se ha encontrado el número de guia";
        
      }
      
      
    });
    this.ocultarMensaje();
  }
   
obtenerDimensiones(){
  this.cotizacion.paquetes=this.envio[0].informacion_envio.paquetes.cantidad;
  this.cotizacion.dimensiones=this.envio[0].informacion_envio.paquetes.dimensiones;
  this.dimensiones=this.cotizacion.obtenerDimensiones();
}

obtenerCiudades(){
 let cpOrigen:CP;
 let cpDestino:CP;
  this.cpService.obtenerCP(this.envio[0].direccion[0].cp).subscribe(res=>{
   cpOrigen=res as CP;
   this.origen=cpOrigen.municipio+", "+cpOrigen.estado;
  });
  this.cpService.obtenerCP(this.envio[0].direccion[1].cp).subscribe(res=>{
    cpDestino=res as CP;
    this.destino=cpDestino.municipio+", "+cpDestino.estado;
  });
}
    
obtenerServicios(){
  this.envio[0].servicios.forEach(element => {
    this.servicios=this.servicios+element.nombre+", ";
  });

  this.servicios=this.servicios.slice(0,-2);
}
  
ocultarMensaje(){
  setTimeout(()=>{
  
   this.mensaje="";
   
  },2000)
}
}
