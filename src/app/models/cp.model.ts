export class CP{
    constructor(codigo_postal:string="",colonias:string[]=[],estado:string="",municipio:string=""){
        this.codigo_postal=codigo_postal;
        this.colonias=colonias;
        this.estado=estado;
        this.municipio=municipio
    }

    codigo_postal:string;
    colonias: string[];
    estado: string;
    municipio:string;
}