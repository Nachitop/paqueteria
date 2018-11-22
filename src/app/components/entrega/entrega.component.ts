import { Component, OnInit } from '@angular/core';
import { EnvioService } from 'src/app/services/envio.service';
import { Envio } from 'src/app/models/envio';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { Auth } from 'src/app/models/auth.model';
import { Comentario } from 'src/app/models/comentarios';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Sucursal } from 'src/app/models/sucursal';


@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.css']
})
export class EntregaComponent implements OnInit {
  guia:string="";
  mensaje:string="";
  mensaje2:string="";
  paquetes:string="";
  sobres:string="";
  guia_existe:boolean=true;
  envio:Envio;
  remitente:string;
  constructor(private envioService:EnvioService,private modalService: NgbModal, private cookie:CookieService, private sucursalService:SucursalService) { }

  ngOnInit() {
  }

  buscarGuia(){
    if(this.guia.length==19){
      this.envioService.obtenerGuiaCompleta(this.guia).subscribe(res=>{
        this.envio=res as Envio;
       
        if(this.envio!=null){
          this.paquetes=this.envio[0].informacion_envio.paquetes.cantidad.toString();
          this.sobres=this.envio[0].informacion_envio.sobres.cantidad.toString();
          this.remitente=this.envio[0].direccion[1].nombre + " " + this.envio[0].direccion[1].apellido;
          this.guia_existe=false;

        }
        else{
          this.mensaje="No se ha encontrado el número de guia solicitado";
          this.guia_existe=true;
          this.reseterar();
        }
      });
  }
  

}

mostrarModal(content){
  this.modalService.open(content,{centered:true});
}

entregarGuia(envio:any){
  let auth:Auth;
  let sucursal:Sucursal;
  let comentario:Comentario=new Comentario;
  let envio2=envio;
 
  if(this.cookie.get('auth')){
  
    auth=JSON.parse(this.cookie.get('auth'));
    comentario.fecha= new Date().toLocaleString();
    this.sucursalService.getSucursalByClave(auth.data2.sucursal).subscribe(res=>{
       sucursal=res as Sucursal;
      
      comentario.lugar=sucursal[0].nombre;
      comentario.comentario="Guia entregada en sucursal";
      this.envioService.entregaEnvio(envio2[0]._id,auth.data2.sucursal,comentario).subscribe(res=>{
        let resp=JSON.stringify(res);
        let resp2=JSON.parse(resp);
        if(resp2.mensaje){
          this.mensaje=resp2.mensaje;
        }
        else{
          this.mensaje2=resp2.error;
        }
      });
    
     
    });
 
    
  
}
else{
  this.mensaje2="Necesita loguearse como un empleado para completar la accion";
}
 this.reseterar()
}
ocultarMensaje(){
  setTimeout(()=>{
   
   this.mensaje="";
  this.mensaje2="";
  },2000)
}



reseterar(){
  this.paquetes="";
  this.sobres="";
  this.remitente="";
  this.guia="";
  this.guia_existe=true;
  this.envio=null;
  this.ocultarMensaje();
}
}
