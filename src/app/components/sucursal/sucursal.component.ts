import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Sucursal } from '../../models/sucursal';
import {SucursalService} from '../../services/sucursal.service';
import {Funciones} from '../../metodos/funciones';
import { Mensaje } from 'src/app/models/mensaje.model';
import {CpService} from '../../services/cp.service';
import { CP } from 'src/app/models/cp.model';




@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {
  s:boolean=false;
  funciones:Funciones= new Funciones;
  mensaje:Mensaje= new Mensaje();
  sucursalForm: FormGroup;
  sucursal:Sucursal= new Sucursal();
  validacion:boolean=false;

  constructor(private sf: FormBuilder, private sucursalService:SucursalService, private cpService:CpService) { }

  ngOnInit() {
    
    this.iniciarForm();
    this.getSucursales();
  }


  iniciarForm(){
    this.sucursalForm = this.sf.group({
      _id:[this.sucursal._id],
      clave:[this.sucursal.clave,[Validators.required,Validators.minLength(5),Validators.maxLength(5), Validators.pattern("[A-Z]{3}[0-9]{2}")]],
      nombre:[this.sucursal.nombre,[Validators.required,Validators.maxLength(35)]],
      encargado:[this.sucursal.encargado,[Validators.required, Validators.maxLength(35)]],
      calle:[this.sucursal.direccion.calle,[Validators.required, Validators.maxLength(30)]],
      num_ext:[this.sucursal.direccion.num_ext,[Validators.required,Validators.maxLength(7)]],
      colonia:[this.sucursal.direccion.colonia,[Validators.required]],
      cp:[this.sucursal.direccion.cp,[Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      telefono:[this.sucursal.telefono,[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("[0-9]{10}")]],
      status:[this.sucursal.status,[Validators.required]]

    });

    
    this.onChanges();
  }

  
  

  onChanges(){
    this.sucursalForm.get('cp').valueChanges.subscribe(res=>{
      this.cpService.obtenerCP(res).subscribe(res=>{
       this.cpService.info_cpOrigen=res as CP
      });
    });
  }
  onSubmit(){
    this.sucursal=this.sucursalForm.value;
    this.cpService.obtenerCP(this.sucursalForm.get('cp').value).subscribe(res=>{
      let cp= res as CP;
      
      this.sucursal.municipio=cp.municipio;
      this.sucursal.estado=cp.estado;
      console.log(this.sucursal);
      if(this.sucursal._id=="" || this.sucursal._id==null){
        console.log(this.sucursal);
        this.sucursalService.postSucursal(this.sucursal).subscribe(res=>{
          this.mensaje= res as Mensaje;
          this.getSucursales();
          
        });
        
      }
      else{
        console.log(this.sucursal);
        this.sucursalService.putSucursal(this.sucursal).subscribe(res=>{
          this.mensaje= res as Mensaje;
          this.getSucursales();
        
        });
      }
    });
    
  
    
    this.sucursalForm.reset();
    this.ocultarMensaje();
      
      
  }

  getSucursales(){
    this.sucursalService.getSucursales().subscribe(res=>{
      this.sucursalService.sucursales= res as Sucursal[];
     
    });
  }
  
  editSucursal(sucursal:Sucursal){
  
   this.sucursalForm.patchValue({
     _id:sucursal._id,
    clave:sucursal.clave,
    nombre: sucursal.nombre,
  
    calle:sucursal.direccion.calle,
    num_ext:sucursal.direccion.num_ext ,
    cp:sucursal.direccion.cp,
    colonia:sucursal.direccion.colonia,
    telefono:sucursal.telefono,
    encargado:sucursal.encargado,
    status:sucursal.status

   });

   
   
  }

validarSucursal(){

 
  this.sucursalService.validarSucursal(this.sucursalForm.get('clave').value).subscribe(res=>{
    
    this.funciones.validarCampos2(res,this.sucursalForm.controls['clave']);
    console.log(this.sucursalForm.controls['clave'].errors);
 
  });
}
  

 ocultarMensaje(){
   setTimeout(()=>{
    this.mensaje.mensaje="";
   },2000)
 }

}
