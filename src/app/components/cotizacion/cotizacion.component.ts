import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Cotizacion} from '../../models/cotizacion.model'
import {CpService} from '../../services/cp.service';
import { CP } from '../../models/cp.model';
import { Dimensiones } from '../../models/dimensiones.models';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {DataserviceService} from '../../services/dataservice.service'

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {
 @ViewChild('cotizacionForm') cotizacionForm:NgForm;

  cotizacion:Cotizacion= new Cotizacion();
  
 

  
  counter(i: number) {
    return new Array(i);
  }
  constructor(private cpService:CpService,private  router:Router, public data:DataserviceService ) { }

  ngOnInit() {
    
   
  }

 
   

    

  onSubmit(){
  
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
