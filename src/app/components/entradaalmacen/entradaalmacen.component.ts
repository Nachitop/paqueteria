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
  guia_existe:boolean=true;
  paquetes:string;
  sobres:string;
  mensaje:string="";
  guia:string;
  arrayGuias:any[]=[];
  auth:Auth;
  mensaje2="";
  mensaje3="";
  
  constructor(private envioService:EnvioService, private cpService:CpService, private cookie:CookieService, private sucursalService:SucursalService) { 
    
    if(this.cookie.get('auth')){
    this.auth=JSON.parse(this.cookie.get('auth'));
    }
  }

  ngOnInit() {
  }

  obtenerGuia(){
    console.log(this.guia);
    this.envioService.obtenerGuia(this.guia).subscribe(res=>{
      let resp= JSON.stringify(res);
      let resp2=JSON.parse(resp);
      
      if(resp2.mensaje){
        console.log(resp2.mensaje);
        this.mensaje=resp2.mensaje;
        this.paquetes="";
        this.sobres="";
        this.guia_existe=true;
        this.ocultarMensaje();
      }
      else{
        this.paquetes=resp2.paquetes;
        this.sobres=resp2.sobres;
        this.guia_existe=false;
        this.mensaje="";
        this.ocultarMensaje();
      }
    });
  }
  ingresar(){
    let guia={no_guia:"", paquetes:"",sobres:""};
    guia.paquetes=this.paquetes;
    guia.sobres=this.sobres;
    guia.no_guia=this.guia;
    if(this.arrayGuias.find(value=>value.no_guia==guia.no_guia)){
      this.mensaje="Esta guia ya esxiste en la lista";
      this.paquetes="";
      this.sobres="";
      this.guia="";
    }else{
    this.arrayGuias.push(guia);

    this.paquetes="";
    this.sobres="";
    this.guia="";
  }
}

  deleteGuia(no_guia:string){
    let index=this.arrayGuias.findIndex(value=>value.no_guia==no_guia);
    this.arrayGuias.splice(index,1);
  }

  ocultarMensaje(){
    setTimeout(()=>{
     this.mensaje2="";
     this.mensaje="";
     this.mensaje3="";
    },2000)
  }
  ingresarAlmacen(){
    let envio;
    let cp,cp2;
    let comentario:Comentario= new Comentario();
    let sucursal;
    if(this.auth){
      console.log("entré")
    if(this.arrayGuias.length>0 && this.auth.data2.puesto==="Almacenista"){
      this.arrayGuias.forEach(value=>{
        this.envioService.obtenerGuiaCompleta(value.no_guia).subscribe(res=>{
          envio= res as Envio;
          
          this.cpService.obtenerCP(envio[0].direccion[1].cp).subscribe(res=>{
             cp= res as CP;
            
            this.sucursalService.getSucursalByClave(this.auth.data2.sucursal).subscribe(res=>{
             sucursal=res as Sucursal;
           
               let cpp=sucursal[0].direccion.cp;
               this.cpService.obtenerCP(cpp).subscribe(res=>{
                cp2=res as CP;
                comentario.fecha= new Date().toLocaleString();
                comentario.lugar=sucursal[0].nombre;
                if(cp.municipio==cp2.municipio && cp.estado==cp2.estado){
                  
                  comentario.comentario="Envío en sucursal destino, pendiente de entrega"
                }
                else{
                  comentario.comentario="Envío en sucursal";
                }
                
                this.envioService.entradaAlmacen(envio[0]._id,sucursal[0].clave,comentario).subscribe(res=>{
                 let resp=JSON.stringify(res);
                 let resp2=JSON.parse(resp);
                 this.mensaje3=resp2.mensaje;
                 this.ocultarMensaje();
                 
                })
               
               });
            });
          });

        });
      });
      this.arrayGuias=[];
    }
    else{
      this.mensaje2="No tiene permisos para ingresar guias al almacén o el listado está vacío";
     
      this.ocultarMensaje();
    }
  }else{
    this.mensaje="Necesita loguearse como empleado tipo Almacenista";
  }
  }
}
