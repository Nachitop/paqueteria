import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Funciones} from '../../metodos/funciones';
import {Tarifa} from '../../models/tarifa.model';
import {TarifaService} from '../../services/tarifa.service';
import { Mensaje } from 'src/app/models/mensaje.model';

@Component({
  selector: 'app-tarifa',
  templateUrl: './tarifa.component.html',
  styleUrls: ['./tarifa.component.css']
})
export class TarifaComponent implements OnInit {
  mensaje:Mensaje=new Mensaje();
  tipoPaquetes=[]=[{
    paquete:'Caja'
  },{
    paquete:'Sobre'
  }];
  funciones:Funciones = new Funciones;
  tarifaForm:FormGroup;
  
  tarifa:Tarifa=new Tarifa();
  constructor(private sf:FormBuilder, private tarifaService:TarifaService) { }

  ngOnInit() {
    this.iniciarForm();
    this.getTarifas();
  }

  iniciarForm(){
    
    this.tarifaForm=this.sf.group({
      _id:[''],
      tipo_paquete:[this.tipoPaquetes[0].paquete,[Validators.required]],
      peso_min:[0.0,[Validators.required,Validators.pattern("[0-9]+([\\.][0-9]*)?")]],
      peso_max:[0.0,[Validators.required,Validators.pattern("[0-9]+([\\.][0-9]*)?")]],
      volumen_min:[0.0,[Validators.required,Validators.pattern("[0-9]+([\\.][0-9]*)?")]],
      volumen_max:[0.0,[Validators.required,Validators.pattern("[0-9]+([\\.][0-9]*)?")]],
      distancia_min:[0.0,[Validators.required,Validators.pattern("[0-9]+([\\.][0-9]*)?")]],
      distancia_max:[0.0,[Validators.required,Validators.pattern("[0-9]+([\\.][0-9]*)?")]],
      precio_normal:[0.0,[Validators.required,Validators.pattern("[0-9]+([\\.][0-9]*)?")]],
      precio_express:[0.0,[Validators.required,Validators.pattern("[0-9]+([\\.][0-9]*)?")]],
      status:['Activa',[Validators.required]],

    });
  }
  onSubmit(){
 
    this.tarifa=this.tarifaForm.value;
    console.log(this.tarifaForm.value);
    if(this.tarifa._id=="" || this.tarifa._id==null || this.tarifa._id==undefined){
      this.tarifaService.postTarifa(this.tarifa).subscribe(res=>{
        this.mensaje=res as Mensaje;
        this.getTarifas();
      });
    }
    else{
      this.tarifaService.putTarifa(this.tarifa).subscribe(res=>{
        this.mensaje=res as Mensaje;
        this.getTarifas();
      });
    }
    this.tarifaForm.reset();
    this.ocultarMensaje();
    
  }

  getTarifas(){
    this.tarifaService.getTarifas().subscribe(res=>{
      this.tarifaService.tarifas=res as Tarifa[];
      console.log(this.tarifaService.tarifas);
    });

  }

  editTarifa(tarifa:Tarifa){
    this.tarifaForm.patchValue({
      _id:tarifa._id,
      tipo_paquete:tarifa.tipo_paquete,
      peso_min:tarifa.dimensiones.peso.min,
      peso_max:tarifa.dimensiones.peso.max,
      volumen_min:tarifa.dimensiones.volumen.min,
      volumen_max:tarifa.dimensiones.volumen.max,
      distancia_min:tarifa.dimensiones.distancia.min,
      distancia_max:tarifa.dimensiones.distancia.max,
      precio_normal:tarifa.precio.normal,
      precio_express:tarifa.precio.express,
      status:tarifa.status,

    });
  }

 
  ocultarMensaje(){
    setTimeout(()=> {
      this.mensaje.mensaje="";
    }, 2000);
    
}


}
