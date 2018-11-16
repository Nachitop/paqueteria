export class Direccion {
   
    constructor(calle:string="",num_ext:string="",colonia:string="",cp:string="", edificio:string="",num_int:string="",referencias_cercanas:string=""){
        this.calle=calle;
        this.num_ext=num_ext;
        this.colonia=colonia;
        this.cp=cp;
        this.edificio=edificio;
        this.num_int=num_int;
        this.referencias_cercanas=referencias_cercanas;
    }

    calle:string;
    num_ext:string;
    colonia:string;
    cp:string;
    edificio:string;
    num_int:string;
    referencias_cercanas:string;
    

}
