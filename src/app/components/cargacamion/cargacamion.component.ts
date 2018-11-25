import { Component, OnInit } from '@angular/core';
import {EmpleadoService} from '../../services/empleado.service'
import { Empleado } from 'src/app/models/empleado';
import { Auth } from 'src/app/models/auth.model';
import { CookieService } from 'ngx-cookie-service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { RutaService } from 'src/app/services/ruta.service';
import { Ruta } from 'src/app/models/ruta.model';
import { EnvioService } from 'src/app/services/envio.service';
import { Envio } from 'src/app/models/envio';
import { Carga } from 'src/app/models/cargacamion.model';
import { CargacamionService } from 'src/app/services/cargacamion.service';
import { NgbModalOptions,NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-cargacamion',
  templateUrl: './cargacamion.component.html',
  styleUrls: ['./cargacamion.component.css']
})
export class CargacamionComponent implements OnInit {

  conductores:Empleado[];
  mensaje:string="";
  auth:Auth=new Auth();
  camiones:Vehiculo[];
  rutas:Ruta[];
  guia:string;
  envio:Envio;
  paquetes: number;
  sobres: number;
  id_envio:string;
  habilitar_ingresar=true;
  envios_array:Envio[]=[];
  mensaje3: string;
  conductor:string;
  vehiculo:string;
  ruta:string;
  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false,
    centered:true,
  };
  mensaje4: string="";
  constructor(private empleadoService:EmpleadoService,private vehiculoService:VehiculoService,private cookie:CookieService, private rutaService:RutaService, private envioService:EnvioService, private cargaService:CargacamionService,
    private modalService: NgbModal,) { 
    this.auth=JSON.parse(this.cookie.get('auth'));
  }

  ngOnInit() {

    this.obtenerConductores();
    this.obtenerVehiculos();
    this.obtenerRutass();
  }
 

  obtenerConductores(){
    this.empleadoService.obtenerConductoresLocales(this.auth.data2.sucursal).subscribe(res=>{
      if(!res){
        this.mensaje="No se han encontrado conductores locales";
      }
      else{
        this.conductores=res as Empleado[];
      }
      console.log(this.conductores);
    });
  }

  obtenerVehiculos(){
    this.vehiculoService.obtenerVehiculosAlmacen(this.auth.data2.sucursal,"Camión").subscribe(res=>{
      if(!res){
        this.mensaje="No se han encontrado camiones";
      }
      else{
        this.camiones=res as Vehiculo[];
      }
      console.log(this.camiones);
    });
  }

  obtenerRutass(){
    this.rutaService.obtenerRutas("Local").subscribe(res=>{
      if(!res){
        this.mensaje="No se han encontrado rutas";
      }
      else{
        this.rutas=res as Ruta[];
      }
      console.log(this.rutas);
    });
  }

  obtenerGuia(){
    this.envioService.obtenerGuiaCompleta(this.guia).subscribe(res=>{
      this.envio=res as Envio;
      if(this.envio!=null && this.envio!=undefined){
        console.log(this.envio)
        console.log(this.auth.data2.sucursal)
        if(this.envio[0].status==="En Almacén" && this.envio[0].sucursal===this.auth.data2.sucursal){
        this.paquetes=this.envio[0].informacion_envio.paquetes.cantidad;
        this.sobres=this.envio[0].informacion_envio.sobres.cantidad;
      
        this.habilitar_ingresar=false;
       
        
        }
        else{
          this.mensaje="Está guia no está disponible para subirse al camión"
          this.habilitar_ingresar=true;
          this.ocultarMensaje();
        }
      }
      else{
        this.mensaje="Guia no encontrada";
        this.habilitar_ingresar=true;
        this.ocultarMensaje();
      }
    });
    
  }

  ingresar(){
   if(this.envios_array.find(value=>value._id===this.envio[0]._id))
    {
      this.mensaje="Guia ya agregada!"
    }
    else{
    this.envios_array.push(this.envio[0]);
    this.guia="";
    this.paquetes=null;
    this.sobres=null;

    }
  }

  deleteEnvio(envio:Envio){
    let index= this.envios_array.findIndex(value=>value._id===envio._id);
    this.envios_array.splice(index,1);
  }
  ingresarCamion(){
    if(this.envios_array.length>0){
      if(this.auth.data2.puesto==="Almacenista"){
    
        let carga:Carga=new Carga();
        carga.empleado=this.conductor;
        carga.ruta=this.ruta;
        carga.vehiculo=this.vehiculo;
        carga.sucursal=this.auth.data2.sucursal;
        carga.status="Creada";
        carga.fecha=new Date().toLocaleString();
        this.envios_array.forEach(element=>{
          carga.envios.push(element._id);
        });
        
        this.cargaService.hacerCargaCamion(carga).subscribe(res=>{
          this.mensaje4=JSON.stringify(res);
         
        });
      }
      else{
        this.mensaje3="No tiene permisos de almacenista para realizar esta acción!";
      this.ocultarMensaje();
      }

    }
    else{
      this.mensaje3="Debe de ingresar más de un paquete al camión";
      this.ocultarMensaje();
    }
  }

  mostrarModal(content){
    
    this.modalService.open(content,this.ngbModalOptions);
  }
  refrescar(){
    window.location.reload();
    
  }
  ocultarMensaje(){
    setTimeout(()=>{
     
     this.mensaje="";
      this.mensaje3="";
    },2000)
  }
}
