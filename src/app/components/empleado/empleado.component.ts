import { Component, OnInit, ViewChild } from '@angular/core';

import {EmpleadoService} from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';
import {SucursalService} from '../../services/sucursal.service';
import { Sucursal } from '../../models/sucursal';
import { Puesto } from '../../models/puesto';
import {Funciones} from '../../metodos/funciones';

import {FormControl,FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Mensaje } from 'src/app/models/mensaje.model';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

 
  
  puestos:Puesto[]=[{

    nombre:'Gerente(a)',
  },
  {
    
    nombre:'Cajero(a)',
  },{

    nombre:'Conductor(a) foraneo(a)'
  },
  {

    nombre:'Conductor(a) local(a)'
  }
];
 
  mensaje:Mensaje= new Mensaje();
  funciones:Funciones= new Funciones;
  empleadoForm: FormGroup;
  empleado:Empleado=new Empleado();
  constructor(private sf: FormBuilder,private empleadoService:EmpleadoService, private sucursalService:SucursalService) {
  }

  ngOnInit() {
   
    this.iniciarForm();
    this.getEmpleados();
    this.getSucursales();
   
  }

  iniciarForm(){
    this.empleadoForm = this.sf.group({
      _id:[this.empleado._id],
      nombre:[this.empleado.nombre,[Validators.required,Validators.maxLength(35)]],
      apellido:[this.empleado.apellido,[Validators.required, Validators.maxLength(35)]],
      email:[this.empleado.email,[Validators.required,Validators.email]],
      curp:[this.empleado.curp,[Validators.required, Validators.pattern("[A-Z]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM](AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[A-Z]{3}[0-9A-Z]\\d")]],
      rfc:[this.empleado.rfc,[Validators.required, Validators.pattern("[A-Z]{4}([0-9]{2})(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))[0-9A-Z]{3}")]],
      nss:[this.empleado.nss,[Validators.required, Validators.pattern("[0-9]{11}")]],
      salario:[this.empleado.salario,[Validators.required, Validators.pattern("[0-9]+([\\.][0-9]*)?")]],
      fecha_nac:[this.empleado.fecha_nac,[Validators.required]],
      fecha_contratacion:[this.empleado.fecha_contratacion,[Validators.required]],
      sucursal:[this.empleado.sucursal,[Validators.required]],
      puesto:[this.puestos[0].nombre,[Validators.required]],
      calle:[this.empleado.direccion.calle,[Validators.required, Validators.maxLength(35)]],
      num_ext:[this.empleado.direccion.num_ext,[Validators.required,Validators.maxLength(7)]],
      colonia:[this.empleado.direccion.colonia,[Validators.required]],
      cp:[this.empleado.direccion.cp,[Validators.required, Validators.minLength(5), Validators.maxLength(5),Validators.pattern("[0-9]{5}")]],
      telefono:[this.empleado.telefono,[Validators.required,Validators.pattern("[0-9]{10}")]],
      status:[this.empleado.status,[Validators.required]]

    });

 
   
  }


 
 
  onSubmit(){
    this.empleado=this.empleadoForm.value;
    console.log(this.empleado);
    if(this.empleado._id=="" || this.empleado._id==null){

      this.empleadoService.createEmpleado(this.empleado)
      .subscribe(res=>{
        this.mensaje= res as Mensaje;
        this.getEmpleados();
       
        
      });
       
    }
    else{
      this.empleadoService.updateEmpleado(this.empleado).subscribe(res=>{
     
        this.mensaje=res as Mensaje;
        this.getEmpleados();
       
       });
    
    }
    this.empleadoForm.reset();
  
   
    this.ocultarMensaje();


  }

  editEmpleado(empleado:Empleado){
    this.empleadoForm.patchValue({
      _id:empleado._id,
      nombre:empleado.nombre,
      apellido:empleado.apellido,
      email:empleado.email,
      curp:empleado.curp,
      nss:empleado.nss,
      rfc:empleado.rfc,
      salario: empleado.salario,
      fecha_nac:empleado.fecha_nac,
      fecha_contratacion:empleado.fecha_contratacion,
      sucursal:empleado.sucursal,
      puesto:empleado.puesto,
      
      calle:empleado.direccion.calle,
      num_ext:empleado.direccion.num_ext ,
      cp:empleado.direccion.cp,
      colonia:empleado.direccion.colonia,
    
      telefono:empleado.telefono,
      status:empleado.status

    });
   
    this.empleadoForm=this.funciones.rellenarForm(this.empleadoForm,empleado);
 
   
  }

  getEmpleados(){
    this.empleadoService.getEmpleadoos().subscribe(res=>{
      this.empleadoService.empleados= res as Empleado[];
    });
  }

  getSucursales(){
    this.sucursalService.getSucursales().subscribe(res=>{
      this.sucursalService.sucursales=res as Sucursal[];
    this.empleadoForm.patchValue({sucursal:this.sucursalService.sucursales[0].clave})
    });
  }

  validarEmail(){
      this.empleadoService.validarEmail(this.empleadoForm.get('email').value).subscribe(res=>{
        this.funciones.validarCampos2(res,this.empleadoForm.controls['email']);
      });
    
  }

  validarCurp(){
    this.empleadoService.validarCurp(this.empleadoForm.get('curp').value).subscribe(res=>{
      this.funciones.validarCampos2(res,this.empleadoForm.controls['curp']);
    });
  
}
validarRfc(){
  this.empleadoService.validarRfc(this.empleadoForm.get('rfc').value).subscribe(res=>{
    this.funciones.validarCampos2(res,this.empleadoForm.controls['rfc']);
  });

}
validarNss(){
  this.empleadoService.validarNss(this.empleadoForm.get('nss').value).subscribe(res=>{
    this.funciones.validarCampos2(res,this.empleadoForm.controls['nss']);
  });

}
  
  ocultarMensaje(){
    setTimeout(()=> {
      this.mensaje.mensaje="";
    }, 2000);
    
}

}
