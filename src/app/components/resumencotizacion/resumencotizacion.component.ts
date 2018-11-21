import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder,FormControl,FormGroup, Validators,FormArray, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import {DataserviceService} from '../../services/dataservice.service'
import { Cotizacion } from 'src/app/models/cotizacion.model';
import {ServicioService} from '../../services/servicio.service';
import { Servicio } from 'src/app/models/servicio.model';

import {HttpClient} from '@angular/common/http'
import {  Distancia } from 'src/app/models/googledistance.model';

import { TarifaService } from 'src/app/services/tarifa.service';
import { Tarifa } from 'src/app/models/tarifa.model';
import { Resumen } from 'src/app/models/resumen.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-resumencotizacion',
  templateUrl: './resumencotizacion.component.html',
  styleUrls: ['./resumencotizacion.component.css']
})

export class ResumencotizacionComponent implements OnInit {
 
  cotizacion:Cotizacion= new Cotizacion
  @ViewChild('form') form:NgForm;
  habilitar_seguro:Boolean=true
  habilitar_servicios:Boolean=true;
  habilitar_btn:Boolean=true
  seguro:number=0;
  seguro2:number=0;
  servicios:Servicio[]
  distancia:any;
  tarifaCaja:Tarifa;
  tarifaSobre:Tarifa;
  resumen:Resumen=new Resumen(0,0,0);
  dimensiones:any;
  servicio2=[];
  servicios_array:string[]=[]
  mensajeModal: string;
  constructor(private sf :FormBuilder,private  router:Router, private data:DataserviceService , private servicioService:ServicioService, private http:HttpClient,private tarifaService:TarifaService,private modalService: NgbModal) { 

    
    
  
    
  }

  ngOnInit() {
   
    this.data.currentSomeDataChanges.subscribe(res=>{
      this.cotizacion= res 
      this.calcularDistancia();
    });
    
    this.servicioService.getServiciosCotizacion().subscribe(res=>{
      this.servicios=  res as Servicio[];
   });
   this.dimensiones= this.cotizacion.obtenerDimensiones();
  }

  
  onSubmit(){
  this.cotizacion.resumencotizacion=this.resumen;
  this.data.someDataChanges(this.cotizacion);
    this.router.navigateByUrl("informacion-envio");
 
  }
 
  calcularDistancia=async()=>{
    console.log("entré")
    let googleResult:Distancia,distancia;
    let url_api="https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="+this.cotizacion.cp_origen+"&destinations="+this.cotizacion.cp_destino+"&key=AIzaSyBSKNno0k2uTLczSQL08pRkCYN_Q419-hg";
    await this.http.get(url_api).subscribe(res=>{
      console.log(res);
      googleResult= res as Distancia
      googleResult.rows.forEach(val=>{
        val.elements.forEach(val=>{
          distancia=val.distance.value
          this.cotizacion.distancia= distancia/1000;
         
        });
      })
    });
  
}

cotizar(content){
  let precio=0, precioSobre=0;
  this.cotizacion.tarifa=[];
  if(this.cotizacion.paquetes>0){
  let cotizacion={peso:0,volumen:0,distancia:0,tipo_paquete:"Caja",tipo_envio:this.cotizacion.tipo_envio};
 
  
 cotizacion.peso=this.dimensiones.peso;
 cotizacion.volumen=this.dimensiones.volumen;
 cotizacion.distancia=this.cotizacion.distancia;
 console.log(cotizacion);
 this.tarifaService.cotizar(cotizacion).subscribe(res=>{
   this.tarifaCaja=res as Tarifa;
   console.log(this.tarifaCaja);
   if((this.tarifaCaja!=null || this.tarifaCaja!=undefined)){
    this.cotizacion.tarifa.push(this.tarifaCaja);
     if(this.cotizacion.tipo_envio==="Express"){
       
     precio=this.tarifaCaja.precio.express;
     }
     else{
      precio=this.tarifaCaja.precio.normal
     }
   }
   else{

    this.mensajeModal="No se ha encontrado tarifa";
    this.habilitar_btn=true;
    this.modalService.open(content,{centered:true});
   }
   this.resumen.obtenerResumen(precio+precioSobre);
 });
 
  }
 
 if(this.cotizacion.sobres>0){
  let cotizacionSobre={peso:0,volumen:0, distancia:0, tipo_paquete:"Sobre",tipo_envio:this.cotizacion.tipo_envio}
 this.tarifaService.cotizar(cotizacionSobre).subscribe(res=>{
  this.tarifaSobre=res as Tarifa;
  
  
  if((this.tarifaSobre!=null || this.tarifaSobre!=undefined)){
    this.cotizacion.tarifa.push(this.tarifaSobre);
    if(this.cotizacion.tipo_envio==="Express"){
    precioSobre=this.tarifaSobre.precio.express;
    }
    else{
     precioSobre=this.tarifaSobre.precio.normal
    }
  }
  else{
   console.log("No se ha encontrado tarifa");
  }
  this.resumen.obtenerResumen(precio+precioSobre);
 });

}

this.habilitar_servicios=false;
this.habilitar_btn=false;

}

clickCheckBox(e){
 
  let _id:string;
  
  if(e.target.checked){
    _id=e.target.id;
 
   this.servicioService.getServicioCotizacion(_id).subscribe(res=>{
    let ser =res as Servicio;
    console.log(ser);
    this.cotizacion.servicios.push(ser);
    if(ser.nombre!="Seguro"){
      this.resumen.actualizarTotalServicios(ser.porcentaje);
    }else{
      this.habilitar_seguro=false
      this.seguro=ser.porcentaje;
      this.habilitar_btn=true;
    }
  });
  }
  else{
    _id=e.target.id;
    //this.servicios_array.splice(this.servicios_array.indexOf(_id),1);
    this.servicioService.getServicioCotizacion(_id).subscribe(res=>{
      let ser =res as Servicio;
     let index=this.cotizacion.servicios.findIndex(value=> value.nombre===ser._id);
     this.cotizacion.servicios.splice(index,1);
      if(ser.nombre!="Seguro"){
        this.resumen.actualizarTotalServiciosEliminar(ser.porcentaje);
      }else{
        this.habilitar_seguro=true
        this.seguro=0;
        this.cotizacion.valor_seguro=0;
        this.resumen.actualizarTotalServiciosSeguroEliminar(this.seguro2);
        this.seguro2=0;
        this.habilitar_btn=false;
      }
       
    });
     
  }
}

obtenerSeguro(){
  this.seguro2= (this.cotizacion.valor_seguro*this.seguro)/1000;
  this.resumen.actualizarTotalServiciosSeguro(this.seguro2);
  this.habilitar_btn=false;
  this.habilitar_seguro=true;
  
}
onFocus(e){
  console.log(e);
}

irAinicio(){
  window.location.reload();
  this.router.navigateByUrl('inicio');
}
}
