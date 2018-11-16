export class Servicio{
    constructor(_id:string="",nombre:string="",porcentaje:number=0,status:string="Activo"){
        this._id=_id;
        this.nombre=nombre;
        this.porcentaje=porcentaje;
        this.status=status
    }

    _id:string;
    nombre:string;
    porcentaje:number;
    status:string;
}