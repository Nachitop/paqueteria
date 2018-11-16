import { Direccion } from "./direccion";



export class Empleado {
    constructor( _id:string="",
        nombre:string="",
        apellido:string="",
        email:string="",
        curp:string="",
        rfc:string="",
        nss:string="",
        salario: number=0,
        fecha_nac:string="",
        fecha_contratacion:string="",
        sucursal:string="",
        puesto:string="",
        telefono:string="",
        direccion:Direccion= new Direccion(),
        status:string="Activo"){

            this._id=_id;
            this.nombre=nombre;
            this.apellido=apellido;
            this.email=email;
            this.curp=curp;
            this.nss=nss;
            this.rfc=rfc;
            this.salario=salario;
          this.fecha_nac=  fecha_nac;
    this.fecha_contratacion=fecha_contratacion;
    this.sucursal=sucursal;
    this.puesto=puesto;
    this.telefono=telefono;
    this.direccion=direccion;
    this.status=status;
    

    }
    _id:string;
    nombre:string;
    apellido:string;
    email:string;
    curp:string;
    rfc:string;
    nss:string;
    salario: number;
    fecha_nac:string;
    fecha_contratacion:string;
    sucursal:string;
    puesto:string;
    telefono:string;
    direccion:Direccion;
    status:string;
}
