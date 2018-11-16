import { Direccion } from "./direccion";


export class Sucursal {

constructor(_id:string="",clave:string="",nombre:string="",encargado:string="",direccion:Direccion= new Direccion(),telefono:string="",status:string="Activa"){
    this._id= _id;
    this.clave=clave;
    this.nombre=nombre;
    this.encargado=encargado;
    this.direccion=direccion;
    this.telefono=telefono;
    this.status=status;
}

    _id:string;
    clave:string;
    nombre:string;
    encargado:string;
    direccion: Direccion;
    telefono:string;
    status:string;
   
}
