import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,FormBuilder,Validators, AbstractControl} from '@angular/forms';
import { Funciones } from '../../metodos/funciones';
import {SucursalService} from '../../services/sucursal.service';
import { Sucursal } from '../../models/sucursal';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { Mensaje } from 'src/app/models/mensaje.model';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {
  mensaje:Mensaje=new Mensaje;
  vehiculos:any[]=[
    {tipo_vehiculo:'Camión'},
    {tipo_vehiculo:'Trailer'},
  ];
  validacion:boolean=false;
  vehiculo:Vehiculo=new Vehiculo();
  funciones:Funciones= new Funciones;
  vehiculoForm:FormGroup;
  constructor(private sf:FormBuilder, private sucursalService:SucursalService, private vehiculoService:VehiculoService) { }

  ngOnInit() {
    this.iniciarForm();
    this.getSucursales();
    this.getVehiculos();
  }

  iniciarForm(){
    this.vehiculoForm=this.sf.group({
      _id:[this.vehiculo._id],
      matricula:[this.vehiculo.matricula,[Validators.required]],
      marca:[this.vehiculo.marca,[Validators.required]],
      modelo:[this.vehiculo.modelo,[Validators.required,Validators.pattern("[0-9]+")]],
      tipo_vehiculo:[this.vehiculos[0].tipo_vehiculo,[Validators.required]],
      sucursal:[this.vehiculo.sucursal,[Validators.required]],
      status:[this.vehiculo.status,[Validators.required]],

    });
  }
  getSucursales(){
    this.sucursalService.getSucursales().subscribe(res=>{
      this.sucursalService.sucursales=res as Sucursal[];
    this.vehiculoForm.patchValue({sucursal:this.sucursalService.sucursales[0].clave})
    });
  }

  onSubmit(){
    this.vehiculo=this.vehiculoForm.value;
    console.log(this.vehiculo);
    if(this.vehiculo._id==null || this.vehiculo._id==undefined || this.vehiculo._id==""){
   
      this.vehiculoService.postVehiculo(this.vehiculo).subscribe(res=>{
        this.mensaje=res as Mensaje;
        this.getVehiculos();
      });
    }
    else{
  
      this.vehiculoService.putVehiculo(this.vehiculo).subscribe(res=>{
        this.mensaje=res as Mensaje;
        this.getVehiculos();
      });
    }
    this.vehiculoForm.reset();
    this.ocultarMensaje();
  }
  getVehiculos(){
    this.vehiculoService.getVehiculos().subscribe(res=>{
      this.vehiculoService.vehiculos= res as Vehiculo[]
    });
  }

  editVehiculo(vehiculo:Vehiculo){
    this.vehiculoForm.patchValue(vehiculo);
  }

  
 validarMatricula(){
  this.vehiculoService.validarMatricula(this.vehiculoForm.get('matricula').value).subscribe(res=>{
    
    this.funciones.validarCampos2(res,this.vehiculoForm.controls['matricula']);
  });
}

  ocultarMensaje(){
    setTimeout(()=> {
      this.mensaje.mensaje="";
    }, 2000);
    
}
}
