import { Component, OnInit } from '@angular/core';
import { EnvioService } from 'src/app/services/envio.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { CookieService } from 'ngx-cookie-service';
import { RutaService } from 'src/app/services/ruta.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Auth } from 'src/app/models/auth.model';
import { Empleado } from 'src/app/models/empleado';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { Ruta } from 'src/app/models/ruta.model';
import { Envio } from 'src/app/models/envio';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from 'src/app/models/sucursal';
import { Bitacora } from 'src/app/models/bitacora.model';
import { BitacoraviajeService } from 'src/app/services/bitacoraviaje.service';


@Component({
  selector: 'app-bitacoraviaje',
  templateUrl: './bitacoraviaje.component.html',
  styleUrls: ['./bitacoraviaje.component.css']
})
export class BitacoraviajeComponent implements OnInit {
  auth:Auth=new Auth();
  mensaje: string="";
  conductores:Empleado[]=[];
  camiones: Vehiculo[]=[];
  rutas: Ruta[]=[];
  envio: Envio;
  guia: string="";
  paquetes: number;
  sobres: number;
  habilitar_ingresar: boolean=true;
  mensaje3: string="";
  envios_array: Envio[]=[];
  sucursales:Sucursal[]=[];
  conductor: string;
  ruta: string;
  vehiculo: string;
  sucursal:string;
  mensaje4: string;
  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false,
    centered:true,
  };
  
  constructor(private empleadoService:EmpleadoService,private vehiculoService:VehiculoService,private cookie:CookieService, private rutaService:RutaService, private envioService:EnvioService,private modalService: NgbModal,
    private sucursalService:SucursalService, private bitacoraService:BitacoraviajeService) {
    this.auth=JSON.parse(this.cookie.get('auth'));
   }

  ngOnInit() {
    this.obtenerConductores();
    this.obtenerVehiculos();
    this.obtenerRutass();
    this.obtenerSucursales();
  }
  obtenerConductores(){
    this.empleadoService.obtenerConductoresForeign(this.auth.data2.sucursal).subscribe(res=>{
      if(!res){
        this.mensaje="No se han encontrado conductores foráneos";
      }
      else{
        this.conductores=res as Empleado[];
      }
     
    });
  }


  obtenerVehiculos(){
    this.vehiculoService.obtenerVehiculosAlmacen(this.auth.data2.sucursal,"Trailer").subscribe(res=>{
      if(!res){
        this.mensaje="No se han encontrado trailers";
      }
      else{
        this.camiones=res as Vehiculo[];
      }
      
    });
  }
  obtenerRutass(){
    this.rutaService.obtenerRutas("Foránea").subscribe(res=>{
      if(!res){
        this.mensaje="No se han encontrado rutas foráneas";
      }
      else{
        this.rutas=res as Ruta[];
      }
    
    });
  }
  obtenerSucursales(){
    this.sucursalService.getSucursales().subscribe(res=>{
      if(!res){
        this.mensaje="No se han encontrado sucursales";
      }else{
        this.sucursales=res as Sucursal[];
        for(let element of this.sucursales){
          
          if(element.status!="Activa"){
            let index=this.sucursales.findIndex(suc=>suc._id===element._id);
           this.sucursales.splice(index,1);
            //break;
          }
        }
      }
    });
  }
  ocultarMensaje(){
    setTimeout(()=>{
     
     this.mensaje="";
      this.mensaje3="";
    },2000)
  }
  obtenerGuia(){
    this.envioService.obtenerGuiaCompleta(this.guia).subscribe(res=>{
      this.envio=res as Envio;
      if(this.envio!=null && this.envio!=undefined){
     
        if(this.envio[0].status==="En Almacén" && this.envio[0].sucursal===this.auth.data2.sucursal){
        this.paquetes=this.envio[0].informacion_envio.paquetes.cantidad;
        this.sobres=this.envio[0].informacion_envio.sobres.cantidad;
      
        this.habilitar_ingresar=false;
       
        
        }
        else{
          this.mensaje="Está guia no está disponible para subirse al trailer"
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


  mostrarModal(content){
    
    this.modalService.open(content,this.ngbModalOptions);
  }
  refrescar(){
    window.location.reload();
    
  }

  ingresarTrailer(){
    if(this.envios_array.length>0){
      if(this.auth.data2.puesto==="Almacenista"){
    
         let bitacora:Bitacora=new Bitacora();
         bitacora.empleado=this.conductor;
         bitacora.ruta=this.ruta;
         bitacora.vehiculo=this.vehiculo;
         bitacora.sucursal_origen=this.auth.data2.sucursal;
         bitacora.sucursal_destino=this.sucursal;
         bitacora.status="Creada";
         bitacora.fecha=new Date().toLocaleString();
        this.envios_array.forEach(element=>{
          bitacora.envios.push(element._id);
        });
        
        this.bitacoraService.hacerBitacora(bitacora).subscribe(res=>{
          this.mensaje4=JSON.stringify(res);
          this.envios_array=[];
        });
      }
      else{
        this.mensaje3="No tiene permisos de almacenista para realizar esta acción!";
      this.ocultarMensaje();
      }

    }
    else{
      this.mensaje3="Debe de ingresar más de un paquete al trailer";
      this.ocultarMensaje();
    }
  }
}
