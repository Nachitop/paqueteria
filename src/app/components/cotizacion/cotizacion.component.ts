import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Cotizacion} from '../../models/cotizacion.model'
import {CpService} from '../../services/cp.service';
import { CP } from '../../models/cp.model';
import { Dimensiones } from '../../models/dimensiones.models';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {DataserviceService} from '../../services/dataservice.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {
 @ViewChild('cotizacionForm') cotizacionForm:NgForm;

  cotizacion:Cotizacion= new Cotizacion();
  array:any[]=[];
  mensaje: string;
  
 

  
  counter(i: number) {
   let arr:number[]=[];
    for(let i=1;i<=this.cotizacion.paquetes;i++){
      arr.push(i);
    }
    return arr;
  }
  constructor(private cpService:CpService,private  router:Router, public data:DataserviceService,private modalService: NgbModal ) { }

  ngOnInit() {
    
   
  }

 hacerArray(){
   if(this.cotizacion.opcion==="No"){
     for(let i=1;i<=this.cotizacion.paquetes;i++){
       let json:any={num:0};
       json.num=1;
      this.array.push(json);
     }
   }
   else{
     this.array=[];
   }
   return this.array;
 }
   

    

  onSubmit(content){
  if(this.cotizacion.paquetes==0 && this.cotizacion.sobres==0){
    this.mensaje="No puedes cotizar un envío, los paquetes o los sobres deben ser mayor a 1";
    this.modalService.open(content,{centered:true});
  }else{
    if(this.cotizacion.cp_origen===this.cotizacion.cp_destino){
      this.mensaje="No puedes cotizar un envío con los mismos códigos postales, CAMBIELOS POR FAVOR, POR LA SANGRE DE JESUCRISTO PROFEEEE AAAAAHHHH";
      this.modalService.open(content,{centered:true});
    }
    else{
    let peso,alto,largo,ancho;
    if(this.cotizacion.opcion=="No" && this.cotizacion.paquetes>1){
    
     
      for(let i=1;i<=this.cotizacion.paquetes;i++){
        
        peso=this.cotizacionForm.controls['peso'+i].value;
        
        largo=this.cotizacionForm.controls['largo'+i].value;
      
        alto=this.cotizacionForm.controls['alto'+i].value;
        
        ancho=this.cotizacionForm.controls['ancho'+i].value;
       
        this.asignarDimensiones(peso,largo,alto,ancho);
       
        
      }
    }
    else{
      
       peso=this.cotizacionForm.controls['peso'].value;
        largo=this.cotizacionForm.controls['largo'].value;
        alto=this.cotizacionForm.controls['alto'].value;
        ancho=this.cotizacionForm.controls['ancho'].value;
        this.asignarDimensiones(peso,largo,alto,ancho);
        
    }
    console.log(this.cotizacion)
    this.data.someDataChanges(this.cotizacion);
    this.router.navigateByUrl("resumen-cotizacion",{

    });
  }
  }
  }


asignarDimensiones(peso:any,largo:any,alto:any,ancho:any){
 let dimension:Dimensiones=new Dimensiones;
  dimension.peso=peso;
  dimension.largo=largo;
  dimension.ancho=ancho;
  dimension.alto=alto;
 
  this.cotizacion.dimensiones.push(dimension);
}
 
 obtenerColoniasOrigen(cp:any){
   
  this.cpService.obtenerCP(cp.value).subscribe(res=>{
  this.cpService.info_cpOrigen=res as CP;

  });
 }
 obtenerColoniasDestino(cp:any){
  this.cpService.obtenerCP(cp.value).subscribe(res=>{
  this.cpService.info_cpDestino=res as CP;

  });
 }
}
