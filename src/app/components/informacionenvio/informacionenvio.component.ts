import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DataserviceService} from '../../services/dataservice.service'
import { Cotizacion } from 'src/app/models/cotizacion.model';
import { InformacionEnvio } from 'src/app/models/informacionEnvio';
@Component({
  selector: 'app-informacionenvio',
  templateUrl: './informacionenvio.component.html',
  styleUrls: ['./informacionenvio.component.css']
})
export class InformacionenvioComponent implements OnInit {

  formInformacionEnvio:FormGroup;
  cotizacion:Cotizacion = new Cotizacion();
  remitente:InformacionEnvio=new InformacionEnvio();
  destinatario:InformacionEnvio= new InformacionEnvio();
  constructor(private fb:FormBuilder, private router:Router, private data:DataserviceService) {
    this.data.currentSomeDataChanges.subscribe(res=>{
      this.cotizacion=res as Cotizacion;
      if(this.cotizacion==null || this.cotizacion==undefined){
        window.location.reload();
        this.router.navigateByUrl('inicio');
      }
    })
   }

  ngOnInit() {
    this.iniciarForm();
  }
  iniciarForm(){
    this.formInformacionEnvio=this.fb.group({
      nombre_r:['',[Validators.required,Validators.maxLength(35)]],
      apellido_r:['',[Validators.maxLength(35)]],
      email_r:['',[Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,4}")]],
      telefono_r:['',[Validators.required,Validators.pattern("[0-9]{10}"),Validators.maxLength(10)]],
      calle_r:['',[Validators.required,Validators.maxLength(35)]],
      numE_r:['',[Validators.required,Validators.maxLength(7)]],
      edificio_r:['',[Validators.maxLength(35)]],
      numI_r:['',[Validators.maxLength(7)]],
      referenciasCercanas_r:['',[Validators.maxLength(50)]],
      nombre_d:['',[Validators.required,Validators.maxLength(35)]],
      apellido_d:['',[Validators.maxLength(35)]],
      email_d:['',[Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+[.][a-z]{2,4}")]],
      telefono_d:['',[Validators.required,Validators.pattern("[0-9]{10}"),Validators.maxLength(10)]],
      calle_d:['',[Validators.required,Validators.maxLength(35)]],
      numE_d:['',[Validators.required,Validators.maxLength(7)]],
      edificio_d:['',[Validators.maxLength(35)]],
      numI_d:['',[Validators.maxLength(7)]],
      referenciasCercanas_d:['',[Validators.maxLength(50)]]
    });

  }
  onSubmit(){
    this.remitente.nombre=this.formInformacionEnvio.get('nombre_r').value;
    this.remitente.apellido=this.formInformacionEnvio.get('apellido_r').value;
    this.remitente.email=this.formInformacionEnvio.get('email_r').value;
    this.remitente.telefono=this.formInformacionEnvio.get('telefono_r').value;
    this.remitente.calle=this.formInformacionEnvio.get('calle_r').value;
    this.remitente.numE=this.formInformacionEnvio.get('numE_r').value;
    this.remitente.edificio=this.formInformacionEnvio.get('edificio_r').value;
    this.remitente.numI=this.formInformacionEnvio.get('numI_r').value;
    this.remitente.referenciasCercanas=this.formInformacionEnvio.get('referenciasCercanas_r').value;

    this.destinatario.nombre=this.formInformacionEnvio.get('nombre_d').value;
    this.destinatario.apellido=this.formInformacionEnvio.get('apellido_d').value;
    this.destinatario.email=this.formInformacionEnvio.get('email_d').value;
    this.destinatario.telefono=this.formInformacionEnvio.get('telefono_d').value;
    this.destinatario.calle=this.formInformacionEnvio.get('calle_d').value;
    this.destinatario.numE=this.formInformacionEnvio.get('numE_d').value;
    this.destinatario.edificio=this.formInformacionEnvio.get('edificio_d').value;
    this.destinatario.numI=this.formInformacionEnvio.get('numI_d').value;
    this.destinatario.referenciasCercanas=this.formInformacionEnvio.get('referenciasCercanas_d').value;

    this.cotizacion.informacionEnvio.push(this.remitente);
    this.cotizacion.informacionEnvio.push(this.destinatario);
    this.data.someDataChanges(this.cotizacion);
    if(this.cotizacion.servicios.find(value=>value.nombre==="Recolección a domicilio")){
    
    this.router.navigateByUrl("recoleccion");
    }else{
      this.router.navigateByUrl("confirmar-envio");
    }
  }
}
