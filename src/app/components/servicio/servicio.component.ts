import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,FormBuilder,Validators} from '@angular/forms';
import {Funciones} from '../../metodos/funciones';
import {Mensaje} from '../../models/mensaje.model';
import {Servicio} from '../../models/servicio.model';
import {ServicioService} from '../../services/servicio.service';
@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  mensaje:Mensaje=new Mensaje();
  funciones:Funciones=new Funciones();

  servicioForm:FormGroup;
  servicio:Servicio=new Servicio();
  constructor(private fb:FormBuilder, private servicioService:ServicioService) { }

  ngOnInit() {
    this.iniciarForm();
    this.getServicios();
  }

  iniciarForm(){
    console.log("hola");
    console.log(this.servicio);
    this.servicioForm=this.fb.group({
      _id:[this.servicio._id],
      nombre:[this.servicio.nombre,[Validators.required,Validators.maxLength(25)]],
      porcentaje:[this.servicio.porcentaje,[Validators.required,Validators.pattern("([0-9][0-9]?)")]],
      status:[this.servicio.status,[Validators.required]],
    });
  }

  onSubmit(){
    this.servicio=this.servicioForm.value;
    if(this.servicio._id=="" || this.servicio._id==undefined || this.servicio._id==null){
      this.servicioService.postServicio(this.servicio).subscribe(res=>{
        this.mensaje=res as Mensaje;
        this.getServicios();
      });
    }else{
      this.servicioService.putServicio(this.servicio).subscribe(res=>{
        this.mensaje=res as Mensaje;
        this.getServicios();
      });
    }
    this.servicioForm.reset();
    this.ocultarMensaje();
  }
  getServicios(){
    this.servicioService.getServicios().subscribe(res=>{
      this.servicioService.servicios= res as Servicio[];
    });
    
  }

  editServicio(servicio:Servicio){
    this.servicioForm.patchValue(servicio);
  }

  ocultarMensaje(){
    setTimeout(()=>{
     this.mensaje.mensaje="";
    },2000)
  }
}
