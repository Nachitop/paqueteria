export class Vehiculo{
    constructor(_id:string="",matricula:string="",marca:string="",modelo:string="",tipo_vehiculo:string="",sucursal:string="",status:string="Activo"){
        this._id=_id;
        this.marca=marca;
        this.matricula=matricula;
        this.modelo=modelo;
        this.tipo_vehiculo=tipo_vehiculo;
        this.sucursal=sucursal;
        this.status=status;
    }
    _id:string;
    matricula:string;
    marca:string;
    modelo:string;
    tipo_vehiculo:string;
    sucursal:string;
    status:string;
}