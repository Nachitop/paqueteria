import { Component, OnInit ,ViewChild} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Auth } from 'src/app/models/auth.model';
import { Router } from '@angular/router';
import { CargacamionService } from 'src/app/services/cargacamion.service';
import { Carga } from 'src/app/models/cargacamion.model';
import { EnvioService } from 'src/app/services/envio.service';
import { Envio } from 'src/app/models/envio';
import { Cotizacion } from 'src/app/models/cotizacion.model';


@Component({
  selector: 'app-entregasadomicilio',
  templateUrl: './entregasadomicilio.component.html',
  styleUrls: ['./entregasadomicilio.component.css']
})
export class EntregasadomicilioComponent implements OnInit {

  auth:Auth
  mensajesesion:string="";
  ngbModalOptions: NgbModalOptions = {
    //backdrop : 'static',
    //keyboard : false,
    centered:true,
  };
  mensaje: string;
  envios:Envio[]=[];
  dimensiones_envios:any[]=[];
 
  opcion:string="";
  recibe:string="";
  comentario:string="";
  mensaje2:string="";
  comentario2: string="";
  
  constructor(private cookie:CookieService,private modalService:NgbModal,private router:Router, private cargacamionService:CargacamionService, private envioService:EnvioService) { 
    if(this.cookie.get('auth')){
      this.auth=JSON.parse(this.cookie.get('auth'));
      if(this.auth.data2.puesto==="Conductor(a) local"){
        
      }
      else{
        this.mensajesesion="No tiene permisos para acceder aquí"
        alert(this.mensajesesion);
        this.router.navigateByUrl('inicio');
        //this.modalService.open(this.myModal)
      }
      }
      else{
        this.mensajesesion="Debes de iniciar sesión";
        alert(this.mensajesesion);
        this.router.navigateByUrl('login');
        //this.modalService.open(this.myModal)
      }
  }

  ngOnInit() {
    this.obtenerCargaCamion();
    
  }
  obtenerCargaCamion(){
    this.cargacamionService.obtenerCargaCamion(this.auth.data2._id).subscribe(res=>{
      let cargacamion:Carga=new Carga();
      cargacamion=res as Carga;
   
      if(cargacamion!=null){
        if(cargacamion.envios.length>0){
        cargacamion.envios.forEach(envio=>{
         
          this.envioService.obtenerGuiaCompletaById(envio).subscribe(res=>{
            let envio=res as Envio
            if(envio!=null && envio!=undefined){
             if(envio.status!="Entregado" && envio.status!="No entregado"){
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

  entregar(n:number){
    let entrega:any={
      empleado:"",
      fecha:"",
      _id:"",
      recibe:"",
      entregado:false,
      comentario:"",
    }
    entrega.empleado=this.auth.data2._id;
    entrega.fecha=new Date().toLocaleString();
    entrega._id=this.envioSelected._id;
    if(n==1){
    
    
    if(this.opcion==="Destinatario"){
    entrega.recibe=this.envioSelected.direccion[1].nombre+" "+ this.envioSelected.direccion[1].apellido;
    }else{
      entrega.recibe=this.recibe;
    }
    entrega.entregado=true;
    entrega.comentario=this.comentario;
  }
  else{
    entrega.entregado=false;
    entrega.comentario=this.comentario2;
  }
    this.envioService.entregaEnvioDomicilio(entrega).subscribe(res=>{
      this.mensaje2=JSON.stringify(res);
      this.envios=[];
      this.dimensiones_envios=[];
      this.recibe="";
      this.comentario="";
      this.opcion="";
      this.comentario2="";
      this.obtenerCargaCamion();
     
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
