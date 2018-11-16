export class Tarifa{
    constructor(_id:string="",tipo_paquete:string="",dimensiones:any={},precio:any={},status:string=""){
        this._id=_id;
        this.tipo_paquete=tipo_paquete;
        this.dimensiones=dimensiones;
        this.precio=precio;
        this.status=status;
    }
    _id:string;
    tipo_paquete:string;
    //peso_min:number;
    //peso_max:number;
    //volumen_min:number;
    //volumen_max:number;
    //distancia_min:number;
    //distancia_max:number;
    //precio_normal:number;
    //precio_express:number;

    dimensiones:any;

    precio:any;

    status:string;



}

