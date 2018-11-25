import { Component, OnInit } from '@angular/core';
import { EnvioService } from 'src/app/services/envio.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { CookieService } from 'ngx-cookie-service';
import { RutaService } from 'src/app/services/ruta.service';
import { Empleado } from 'src/app/models/empleado';
import { Auth } from 'src/app/models/auth.model';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { Ruta } from 'src/app/models/ruta.model';
import { HorariosService } from 'src/app/services/horarios.service';
import { Horarios } from 'src/app/models/horarios.model';
import { Envio } from 'src/app/models/envio';
import { CargaRecoleccion } from 'src/app/models/cargarecoleccion';
import { CargarecoleccionService } from 'src/app/services/cargarecoleccion.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-cargarecoleccion',
  templateUrl: './cargarecoleccion.component.html',
  styleUrls: ['./cargarecoleccion.component.css']
})
export class CargarecoleccionComponent implements OnInit {
  mensaje: string="";
  conductores: Empleado[]=[];
  auth:Auth=new Auth()
  camiones: Vehiculo[]=[];
  rutas: Ruta[]=[];
  horarios:Horarios[]=[];
  conductor:string="";
  ruta:string="";
  vehiculo:string="";
  horario:string="";
  envios:Envio[]=[];
  envios2:Envio[]=[];

  n:any 
  d = new Date()
  dia = new Array(7);
  mensaje5: string="";
  mensaje3: string="";
  mensaje4: string="";

  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false,
    centered:true,
  };
  constructor(private empleadoService:EmpleadoService,private vehiculoService:VehiculoService,private cookie:CookieService, private rutaService:RutaService, private envioService:EnvioService,
    private horarioService:HorariosService, private cargaRecoleccionService:CargarecoleccionService,private modalService: NgbModal) {
    this.auth=JSON.parse(this.cookie.get('auth'));

    this.dia[1] = "Lunes";
    this.dia[2] = "Martes";
    this.dia[3] = "Miércoles";
    this.dia[4] = "Jueves";
    this.dia[5] = "Viernes";
    this.dia[6] = "Sábado";
    
    this.n =this.getDia(this.d.getDay());
   }

  ngOnInit() {
    this.obtenerConductores();
    this.obtenerVehiculos();
    this.obtenerRutass();
    this.obtenerHorarios();
  
  }
  
  obtenerConductores(){
    this.empleadoService.obtenerConductoresLocales(this.auth.data2.sucursal).subscribe(res=>{
      if(!res){
        this.mensaje="No se han encontrado conductores locales";
      }
      else{
        this.conductores=res as Empleado[];
      }
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
    });
  }

  obtenerHorarios(){
    this.horarioService.getHorarios().subscribe(res=>{
      if(!res){
        this.mensaje="No se han encontrado horarios";
      }
      else{
        this.horarios=res as Horarios[];
       this.horarios= this.horarios.filter(element=>element.dia===this.n)
      }
    })
  }

  obtenerEnvios(){
    this.envioService.enviosPorRecolectar(this.auth.data2.sucursal,this.horario).subscribe(res=>{
      if(res!=null){
        this.envios=res as Envio[];;
      }
      else{
        this.mensaje="No se han encontrado guias por recolectar";
      }
    });
    //let horario2=this.horario.replace(" ","").split(",")[1];
    
    
  }

  getDia(index){
   
    return this.dia[index];
  
  }

  addEnvio(envio:Envio){
    if(!this.envios2.find(value=>value._id===envio._id)){
      this.envios2.push(envio);
    }
    else{
      this.mensaje5="guia ya añadida!"
      this.ocultarMensaje();
    }
  }
  deleteEnvio(envio:Envio){
    if(this.envios2.find(value=>value._id===envio._id)){
      let index=this.envios2.findIndex(value=>value._id===envio._id)
      this.envios2.splice(index,1);
    }
    else{
      this.mensaje5="guia no se encuentra añadida!"
      this.ocultarMensaje();
    }
  }
  cargaRecoleccion(){
    if(this.envios2.length>0){
      if(this.auth.data2.puesto==="Almacenista"){
        
       let cargaRecoleccion:CargaRecoleccion=new CargaRecoleccion();
       cargaRecoleccion.empleado=this.conductor;
       cargaRecoleccion.vehiculo=this.vehiculo;
       cargaRecoleccion.ruta=this.ruta;
       cargaRecoleccion.fecha=new Date().toLocaleString();
       cargaRecoleccion.sucursal=this.auth.data2.sucursal;
       cargaRecoleccion.horario=this.horario;
       cargaRecoleccion.status="Creada";
      this.envios2.forEach(value=>{
        cargaRecoleccion.envios.push(value._id);
      });
      this.cargaRecoleccionService.hacerCargaRecoleccion(cargaRecoleccion).subscribe(res=>{
        this.mensaje4=JSON.stringify(res);
      });
      
      }
      else{
        this.mensaje3="No tiene permisos de almacenista para realizar esta acción!";
      this.ocultarMensaje();
      }

    }
    else{
      this.mensaje3="Debe de ingresar más de un paquete al camión para recolectar";
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
     
    
      this.mensaje5="";
    },2000)
  }
}
