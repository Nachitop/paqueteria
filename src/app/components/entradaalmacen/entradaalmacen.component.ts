import { Component, OnInit } from '@angular/core';
import { EnvioService } from 'src/app/services/envio.service';
import { Envio } from 'src/app/models/envio';
import { CpService } from 'src/app/services/cp.service';
import { CP } from 'src/app/models/cp.model';
import { CookieService } from 'ngx-cookie-service';
import { Auth } from 'src/app/models/auth.model';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from 'src/app/models/sucursal';
import { Comentario } from 'src/app/models/comentarios';

@Component({
  selector: 'app-entradaalmacen',
  templateUrl: './entradaalmacen.component.html',
  styleUrls: ['./entradaalmacen.component.css']
})
export class EntradaalmacenComponent implements OnInit {
  
  paquetes:string;
  sobres:string;
  mensaje:string="";
  guia:string="";
  auth:Auth;
  mensaje2="";
  mensaje3="";
  envio:Envio;
  habilitar_ingresar: boolean=true;
  envios_array:Envio[]=[];
  constructor(private envioService:EnvioService, private cpService:CpService, private cookie:CookieService, private sucursalService:SucursalService) { 
    
    if(this.cookie.get('auth')){
    this.auth=JSON.parse(this.cookie.get('auth'));
    }
  }

  ngOnInit() {
  }

  obtenerGuia(){
   
    this.envioService.obtenerGuiaCompleta(this.guia).subscribe(res=>{
      this.envio=res as Envio;
      if(this.envio!=null && this.envio!=undefined){
        console.log(this.envio)
        console.log(this.auth.data2.sucursal)
        if((this.envio[0].status==="Documentada" || this.envio[0].status==="En ruta local para entrega") && this.envio[0].sucursal===this.auth.data2.sucursal){
        this.paquetes=this.envio[0].informacion_envio.paquetes.cantidad;
        this.sobres=this.envio[0].informacion_envio.sobres.cantidad;
      
        this.habilitar_ingresar=false;
       
        
        }
        else{
          this.mensaje="Está guia no puede ser ingresada al almacén"
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

  ocultarMensaje(){
    setTimeout(()=>{
     this.mensaje2="";
     this.mensaje="";
     this.mensaje3="";
    },2000)
  }
  ingresarAlmacen(){

    if(this.envios_array.length>0){
      if(this.auth.data2.puesto==="Almacenista"){
      
        this.envioService.entradaAlmacen(this.auth.data2.sucursal,this.envios_array).subscribe(res=>{
         this.mensaje3=JSON.stringify(res);
         this.envios_array=[];
         this.ocultarMensaje();
        });
      
      }
      else{
        this.mensaje2="No tiene permisos de almacenista para realizar esta acción!";
        this.ocultarMensaje();
      }
    }
    else{
      this.mensaje2="Debe ingresar más de una guia al camión";
      this.ocultarMensaje();
    }


  }
}
