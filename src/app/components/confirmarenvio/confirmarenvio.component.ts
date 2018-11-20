import { Component, OnInit } from '@angular/core';
import {DataserviceService} from '../../services/dataservice.service'
import { Cotizacion } from 'src/app/models/cotizacion.model';
import {CpService} from '../../services/cp.service';
import { CP } from 'src/app/models/cp.model';
import { Router } from '@angular/router';
import {EmpleadoService} from '../../services/empleado.service';  
import { Auth } from 'src/app/models/auth.model';
import {EnvioService} from '../../services/envio.service';
import { CookieService } from 'ngx-cookie-service';
import {SucursalService} from '../../services/sucursal.service';
import { Sucursal } from 'src/app/models/sucursal';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

 

@Component({
  selector: 'app-confirmarenvio',
  templateUrl: './confirmarenvio.component.html',
  styleUrls: ['./confirmarenvio.component.css']
})
export class ConfirmarenvioComponent implements OnInit {



  cotizacion:Cotizacion= new Cotizacion()
  cp:CP= new CP();
  lugar_origen:any;
  lugar_destino:any;
  dimensiones:any;
  cpCliente:any;
  constructor(private data:DataserviceService, private cpService:CpService, private router:Router, private empleadoService:EmpleadoService, private envioService:EnvioService,private cookie:CookieService, private sucursalService:SucursalService) {
    this.data.currentSomeDataChanges.subscribe(res=>{
      this.cotizacion=res as Cotizacion;
      this.dimensiones=this.cotizacion.obtenerDimensiones();
      this.obtenerCPOrigen(this.cotizacion.cp_origen);
      this.obtenerCPDestino(this.cotizacion.cp_destino);
      this.logged();
      
    });

    

   }

  ngOnInit() {
   
  }

  obtenerCPOrigen(cp:any){
     this.cpService.obtenerCP(cp).subscribe(res=>{
       this.cp= res as CP
      this.lugar_origen= this.cp.municipio + ", "+ this.cp.estado+"."
      
    });
  }
  obtenerCPDestino(cp:any){
    this.cpService.obtenerCP(cp).subscribe(res=>{
      this.cp= res as CP
     this.lugar_destino= this.cp.municipio + ", "+ this.cp.estado+"."
     
   });
 }

 onSubmit(metodo:any){
  this.cotizacion.metodo_pago=metodo.value;

   this.cotizacion.status="Documentada";
   this.cotizacion.comentario.fecha= new Date().toLocaleString();
   if(this.cotizacion.servicios.find(element=>element.nombre==="Recolección a domicilio")){
     this.cotizacion.comentario.comentario="Envío registrado, pendiente de recolección";
     this.cotizacion.comentario.lugar="Domicilio del cliente";
   }
   else{
     this.cotizacion.comentario.comentario="Envío registrado";
     let cookie;
     // cookie=this.cookie.get('auth');
     //if(cookie!=undefined || cookie!="" || cookie!=null){
       if(this.cookie.get('auth')){
      cookie=JSON.parse(this.cookie.get('auth'));
     this.sucursalService.getSucursal(cookie.data2.sucursal).subscribe(res=>{
        let sucursal=res as Sucursal;
        this.cotizacion.comentario.lugar=sucursal.nombre;
     });
    }
    else{
      this.cotizacion.comentario.comentario="Envío Ocurre";
      this.sucursalService.getSucursal(this.cotizacion.sucursal).subscribe(res=>{
        let sucursal=res as Sucursal;
        this.cotizacion.comentario.lugar=sucursal.nombre;
     });

    }
     
   }

   
   console.log(this.cotizacion)
   
   //this.cotizacion.comentario.comentario="Envio registrado"
  this.envioService.hacerEnvio(this.cotizacion).subscribe(res=>{
    console.log(res);
  });
   this.router.navigateByUrl('inicio');
 }
 logged(){
  let auth;
   //auth=this.cookie.get('auth');
   //console.log(auth);
   
   //if(auth!="" || auth!=null || auth!=undefined){
     if(this.cookie.get('auth')){
    auth=JSON.parse(this.cookie.get('auth'));
     this.cotizacion.empleado=auth.data2._id;
     this.cotizacion.sucursal=auth.data2.sucursal
   }
   else{
    this.obtenerLugarCliente();
      
   }
 }
obtenerLugarCliente(){
  this.cpService.obtenerCP(this.cotizacion.cp_origen).subscribe(res=>{
    this.cpCliente= res as CP;
    console.log(this.cpCliente);
   this.asignarSucursal()
    
  });
}
 asignarSucursal(){

  this.sucursalService.getSucursales().subscribe(res=>{
    let sucursales= res as Sucursal[];
    var suc;
    if( suc=sucursales.find(val=>val.municipio===this.cpCliente.municipio && val.estado===this.cpCliente.estado)){
      console.log(suc);
      this.cotizacion.sucursal=suc.clave;
    }
  });
  }


  
}