import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DataserviceService} from '../../services/dataservice.service'
import { Cotizacion } from 'src/app/models/cotizacion.model';
import { InformacionEnvio } from 'src/app/models/informacionEnvio';
import { HorariosService } from 'src/app/services/horarios.service';
import { Horarios } from 'src/app/models/horarios.model';

@Component({
  selector: 'app-recoleccion',
  templateUrl: './recoleccion.component.html',
  styleUrls: ['./recoleccion.component.css']
})
export class RecoleccionComponent implements OnInit {
  @Input()
  n:any 
  d = new Date()
   dia = new Array(7);
  fecha_recoleccion:any;
  cotizacion:Cotizacion=new Cotizacion();
  form:FormGroup;
  horarios:Horarios[]= [];
  direccionRecoleccion:InformacionEnvio= new InformacionEnvio();
  constructor(private fb:FormBuilder, private router:Router, private data:DataserviceService, private horariosService:HorariosService) { 
    this.data.currentSomeDataChanges.subscribe(res=>{
      this.cotizacion=res as Cotizacion;
      if(this.cotizacion==null || this.cotizacion==undefined){
        window.location.reload();
        this.router.navigateByUrl('inicio');
      }
   
    });

    //this.dia[0] = "Domingo";
    this.dia[1] = "Lunes";
    this.dia[2] = "Martes";
    this.dia[3] = "Miércoles";
    this.dia[4] = "Jueves";
    this.dia[5] = "Viernes";
    this.dia[6] = "Sábado";
    
    this.n =this.getDia(this.d.getDay());

  }

  ngOnInit() {
    this.iniciarForm();
    this.horariosService.getHorarios().subscribe(res=>{
      this.horariosService.horarios=res as Horarios[];

    });
  }
 
  iniciarForm(){
    this.form= this.fb.group({
      dia:['',[Validators.required]],
      horario:['',[Validators.required]],
    });
    this.onChanges();
  }

  onChanges(){
    this.form.get('dia').valueChanges.subscribe(val=>{
      this.horarios=this.horariosService.horarios.filter(valor=>valor.dia===val);
     let dia= this.getDiaPos(val);
     for(var i=1;i<=8;i++){

        var fecha= new Date();
        var fecha2= new Date()
         fecha2.setDate( fecha.getDate()+i);
        console.log(fecha2)
        let dia2=fecha2.getDay();
        console.log(dia)
        console.log(dia2);
        if(dia==dia2){
            this.fecha_recoleccion=fecha2.getDate() +"/" +(fecha2.getMonth()+1)+"/"+fecha2.getFullYear();
            this.cotizacion.fecha_recoleccion_programada=this.fecha_recoleccion;
            break;
        }
     }
     
    });

    this.form.get('horario').valueChanges.subscribe(val=>{
      this.cotizacion.horario_recoleccion=val;
    });
  }
  onSubmit(){
    
    this.data.someDataChanges(this.cotizacion);
    this.router.navigateByUrl('confirmar-envio')
  }

  

  getDia(index){
   
  return this.dia[index];

}

getDiaPos(dia:any){
 
  return this.dia.findIndex(val=>val===dia)
}

}
