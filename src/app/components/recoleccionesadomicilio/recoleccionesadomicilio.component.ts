import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Auth } from 'src/app/models/auth.model';
import { Router } from '@angular/router';
import { EnvioService } from 'src/app/services/envio.service';
import { Envio } from 'src/app/models/envio';
import { Cotizacion } from 'src/app/models/cotizacion.model';
import {CargaRecoleccion} from '../../models/cargarecoleccion';
import {CargarecoleccionService} from '../../services/cargarecoleccion.service';
@Component({
  selector: 'app-recoleccionesadomicilio',
  templateUrl: './recoleccionesadomicilio.component.html',
  styleUrls: ['./recoleccionesadomicilio.component.css']
})
export class RecoleccionesadomicilioComponent implements OnInit {
  auth:Auth
  mensajesesion:string="";
  ngbModalOptions: NgbModalOptions = {
    centered:true,
  };
  mensaje: string;
  envios:Envio[]=[];
  dimensiones_envios:any[]=[];
 
  opcion:string="";
  atiende:string="";
  comentario:string="";
  mensaje2:string="";
  comentario2: string="";
  constructor(private cookie:CookieService,private modalService:NgbModal,private router:Router, private cargacRecoleccionService:CargarecoleccionService, private envioService:EnvioService) { 
    if(this.cookie.get('auth')){
      this.auth=JSON.parse(this.cookie.get('auth'));
      if(this.auth.data2.puesto==="Conductor(a) local"){
        
      }
      else{
        this.mensajesesion="No tiene permisos para acceder aquí"
        alert(this.mensajesesion);
        this.router.navigateByUrl('inicio');
       
      }
      }
      else{
        this.mensajesesion="Debes de iniciar sesión";
        alert(this.mensajesesion);
        this.router.navigateByUrl('login');
       
      }
  }

  ngOnInit() {
    this.obtenerCargaRecoleccion();
  }

  obtenerCargaRecoleccion(){
    this.cargacRecoleccionService.obtenerCargaRecoleccion(this.auth.data2._id).subscribe(res=>{
      let cargaRecoleccion:CargaRecoleccion=new CargaRecoleccion;
      cargaRecoleccion=res as CargaRecoleccion;
     
      if(cargaRecoleccion!=null){
        if(cargaRecoleccion.envios.length>0){
        cargaRecoleccion.envios.forEach(envio=>{
         
          this.envioService.obtenerGuiaCompletaById(envio).subscribe(res=>{
            let envio=res as Envio
            if(envio!=null && envio!=undefined){
             if(envio.status!="Recolectado" && envio.status!="No recolectado"){
            let cotizacion:Cotizacion=new Cotizacion;
            this.envios.push(envio);
            cotizacion.paquetes=envio.informacion_envio.paquetes.cantidad;
            cotizacion.dimensiones=envio.informacion_envio.paquetes.dimensiones;
            let dimension_envio:any={
              envio:"",
              peso:"",
              volumen:"",
            }
            let dimension=cotizacion.obtenerDimensiones();
            dimension_envio.envio=envio._id;
            dimension_envio.peso=dimension.peso;
            dimension_envio.volumen=dimension.volumen;
            this.dimensiones_envios.push(dimension_envio);
         

          }
          
          }
          else{
            this.mensaje="No se han encontrado información de envios";
          }
      
          });
        
        });
      }
      else{
        this.mensaje="No se han encontrado paquetes";
      }
      }
      else{
        this.mensaje="No se ha encontrado carga de trabajo";
      }
    });
    if(this.envios.length>0){

    }
    else{
      this.mensaje="No hay más carga de trabajo";
    }
    this.ocultarMensaje();
  }

  recolectar(n:number){
    let recoleccion:any={
      empleado:"",
      fecha:"",
      _id:"",
      atiende:"",
      recolectado:false,
      comentario:"",
    }
    recoleccion.empleado=this.auth.data2._id;
    recoleccion.fecha=new Date().toLocaleString();
    recoleccion._id=this.envioSelected._id;
    if(n==1){
    
    
    if(this.opcion==="Remitente"){
    recoleccion.atiende=this.envioSelected.direccion[0].nombre+" "+ this.envioSelected.direccion[0].apellido;
    }else{
      recoleccion.atiende=this.atiende;
    }
    recoleccion.recolectado=true;
    recoleccion.comentario=this.comentario;
  }
  else{
    recoleccion.entregado=false;
    recoleccion.comentario=this.comentario2;
  }
    this.envioService.recoleccionEnvioDomicilio(recoleccion).subscribe(res=>{
      this.mensaje2=JSON.stringify(res);
      this.envios=[];
      this.dimensiones_envios=[];
      this.atiende="";
      this.comentario="";
      this.opcion="";
      this.comentario2="";
      this.obtenerCargaRecoleccion();;
     
    });

    
  }

  envioSelected:Envio;
  envioSeleccionado(envio:Envio){
    this.envioSelected=envio;
  }
  abrirModal(content){
    this.modalService.open(content,this.ngbModalOptions);
  }
  
  obtenerPeso(envio_id:string){
    let envio=this.dimensiones_envios.find(value=>value.envio===envio_id);
    return envio.peso
  }
  obtenerVolumen(envio_id:string){
    let envio=this.dimensiones_envios.find(value=>value.envio===envio_id);
    return envio.volumen
  }


  ocultarMensaje(){
    setTimeout(()=>{
     
    
      this.mensaje="";
      this.mensaje2="";
    },2000)
  }
}
