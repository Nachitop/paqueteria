import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {EnvioService} from '../../services/envio.service';


@Component({
  selector: 'app-cancelacionguia',
  templateUrl: './cancelacionguia.component.html',
  styleUrls: ['./cancelacionguia.component.css']
})
export class CancelacionguiaComponent implements OnInit {
  closeResult: string;
  mensaje:string;
  guia:string;
  clave:string;

  constructor(private modalService: NgbModal, private envioService:EnvioService) { }

  ngOnInit() {
  }
 
  cancelarGuia(content){
    this.envioService.cancelarEnvio(this.guia,this.clave).subscribe(res=>{
     
      let resp;
      let resp2;
      resp=JSON.stringify(res);
      resp2=JSON.parse(resp);
      if(resp2.envio!=undefined || resp2.envio!=null || resp2.envio==""){
        this.mensaje=resp2.mensaje+", Devolver la cantidad de $"+resp2.envio;
      }
      else{
        this.mensaje=resp2.mensaje;
      }
      this.modalService.open(content,{centered:true});
      this.guia="";
      this.clave="";
    });

  }
}
