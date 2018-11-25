import { Component, OnInit } from '@angular/core';
import {CargacamionService} from '../../services/cargacamion.service'
import {CargarecoleccionService} from '../../services/cargarecoleccion.service'
import {BitacoraviajeService} from '../../services/bitacoraviaje.service'
import { CookieService } from 'ngx-cookie-service';
import { Auth } from 'src/app/models/auth.model';
import { Router } from '@angular/router';
import { Carga } from 'src/app/models/cargacamion.model';
import { CargaRecoleccion } from 'src/app/models/cargarecoleccion';
import { Bitacora } from 'src/app/models/bitacora.model';
@Component({
  selector: 'app-finalizartarea',
  templateUrl: './finalizartarea.component.html',
  styleUrls: ['./finalizartarea.component.css']
})
export class FinalizartareaComponent implements OnInit {
  auth:Auth=new Auth();
  mensajesesion: string="";
  cargascamion:Carga[]=[];
  mensaje:string="";
  cargasrecoleccion: CargaRecoleccion[]=[];
  bitacoras: Bitacora[]=[];
  mensaje2: string="";
  mensaje3: string="";
  mensaje5: string="";
  mensaje4: string="";
  mensaje6: string="";
  constructor(private cargacamionService:CargacamionService, private cookie:CookieService,private router:Router,private cargaRecoleccionService:CargarecoleccionService,
   private bitacoraService:BitacoraviajeService) { 
    if(this.cookie.get('auth')){
      this.auth=JSON.parse(this.cookie.get('auth'));
      if(this.auth.data2.puesto==="Almacenista"){
        
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
    this.obtenerCargasCamion();
    this.obtenerCargasRecoleccion();
    this.obtenerBitacoras();
  }
  obtenerCargasCamion(){
    this.cargacamionService.obtenerCargasCamion(this.auth.data2.sucursal).subscribe(res=>{
      console.log(res);
      if(res!=null){
        this.cargascamion=res as Carga[];
      }
      else{
        this.mensaje3="No se han encontrado cargas de camiones";
      }
    });
  }

  obtenerCargasRecoleccion()
  {
    this.cargaRecoleccionService.obtenerCargasRecoleccion(this.auth.data2.sucursal).subscribe(res=>{
      
      if(res!=null){
        this.cargasrecoleccion=res as CargaRecoleccion[];
      }
      else{
        this.mensaje5="No se han encontrado cargas de recolección";
      }
    });
  }

  obtenerBitacoras(){
    this.bitacoraService.obtenerBitacoras(this.auth.data2.sucursal).subscribe(res=>{
      
      if(res!=null){
        this.bitacoras=res as Bitacora[];
      }
      else{
        this.mensaje="No se han encontrado bitácoras de viaje";
      }
    });
  }

  finalizarCargaCamion(_id:string){
    this.cargacamionService.editCargaCamion(_id).subscribe(res=>{
      this.mensaje4=JSON.stringify(res);
      this.cargascamion=[];
      this.obtenerCargasCamion();
      this.ocultarMensaje();

    });
  }
  finalizarCargaRecoleccion(_id:string){
    this.cargaRecoleccionService.editCargasRecoleccion(_id).subscribe(res=>{
      this.mensaje6=JSON.stringify(res);
      this.cargasrecoleccion=[];
      this.obtenerCargasRecoleccion();
      this.ocultarMensaje();
    });
  }

  ocultarMensaje(){
    setTimeout(()=>{
     
      this.mensaje6="";
      this.mensaje4="";
      this.mensaje2="";
    },2000)
  }
}
