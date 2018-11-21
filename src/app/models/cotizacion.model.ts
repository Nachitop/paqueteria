import {Dimensiones} from  './dimensiones.models'
import {Servicio} from './servicio.model';
import { Resumen } from './resumen.model';
import { Tarifa } from './tarifa.model';
import { InformacionEnvio } from './informacionEnvio';
import { Empleado } from './empleado';
import { Comentario } from './comentarios';
export class Cotizacion{

    constructor(paquetes:number=0,sobres:number=0,dimensiones:Array<Dimensiones>= new Array<Dimensiones>(),cp_origen:string="",cp_destino:string="",colonia_origen:string="",colonia_destino:string="",opcion:string="",tipo_envio:string="",valor_seguro:number=0,servicios:Servicio[]= [], distancia:number=0,
    resumencotizacion= new Resumen(),tarifa:Tarifa[]= [], informacionEnvio:InformacionEnvio[]=[],fecha_recoleccion_programada:string="",empleado:string="", comentario:Comentario=new Comentario(),status:string="",
    sucursal:string="",horario_recoleccion:string="",metodo_pago:string=""){
        this.paquetes=paquetes;
        this.sobres=sobres;
        this.dimensiones=dimensiones;
        this.cp_origen=cp_origen;
        this.cp_destino=cp_destino;
        this.colonia_origen=colonia_origen;
        this.colonia_destino=colonia_destino
        this.opcion=opcion;
        this.tipo_envio=tipo_envio;
        this.valor_seguro=valor_seguro;
        this.servicios=servicios;
        this.distancia=distancia;
        this.resumencotizacion=resumencotizacion;
        this.tarifa=tarifa;
        this.informacionEnvio=informacionEnvio;
        this.fecha_recoleccion_programada=fecha_recoleccion_programada;
        this.empleado=empleado;
        this.comentario=comentario
        this.status=status;
        this.sucursal=sucursal;
        this.horario_recoleccion=horario_recoleccion;
        this.metodo_pago=metodo_pago;
    }
    
    paquetes: number;
    sobres:number;
    dimensiones:Array<Dimensiones>;
    cp_origen:string;
    colonia_origen:string;
    cp_destino:string;
    colonia_destino:string;
    opcion:string;
    tipo_envio:string;
    valor_seguro:number;
    servicios:Servicio[];
    resumencotizacion:Resumen;
    distancia:number;
    tarifa:Tarifa[];
    informacionEnvio:InformacionEnvio[];
    fecha_recoleccion_programada:string;
    empleado:string;
    comentario:Comentario;
    status:string;
    sucursal:string;
    horario_recoleccion:string;
    metodo_pago:string;
   

    obtenerDimensiones(){
        let dimensiones={
            peso:0,
            volumen:0
        }
        this.dimensiones.forEach(element => {
            dimensiones.peso=Number(dimensiones.peso)+Number(element.peso)
            console.log(dimensiones.peso)
            dimensiones.volumen= dimensiones.volumen + (element.alto*element.ancho*element.largo);
            // if(this.opcion==="No"){

            // }else{
            //     dimensiones.peso=dimensiones.peso*this.paquetes;
            //     dimensiones.volumen=dimensiones.volumen*this.paquetes;
            // }
        });
        if(this.dimensiones.length==1 && this.paquetes>0){
            dimensiones.peso=dimensiones.peso*this.paquetes;
            dimensiones.volumen=dimensiones.volumen*this.paquetes;
        }else{
           
        }
        return dimensiones
    }

}