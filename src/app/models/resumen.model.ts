export class Resumen{
    subtotal:number;
    iva:number;
    total:number;
    total_seguro:number
    constructor(subtotal=0,iva=0,total=0,total_seguro=0){
        this.subtotal=subtotal;
        this.iva=iva;
        this.total=total;
        this.total_seguro=total_seguro;
    }
  
    obtenerResumen(precio:number,porcentaje?:0){
      this.subtotal=precio-(precio*.16);
      this.iva=precio*.16;
      this.total=this.subtotal+this.iva;
      
      
    }

    actualizarTotalServicios(porcentaje:any){
            this.total=this.total+porcentaje;
            this.subtotal=this.total- (this.total*.16)
            this.iva=this.total*.16
          
    }
    actualizarTotalServiciosEliminar(porcentaje:any){
        this.total=this.total-porcentaje;
        this.subtotal=this.total- (this.total*.16)
        this.iva=this.total*.16
      
}
actualizarTotalServiciosSeguro(porcentaje:any){
  
    this.total=this.total+porcentaje;
    this.subtotal=this.total- (this.total*.16)
    this.iva=this.total*.16
   
  
}
actualizarTotalServiciosSeguroEliminar(seguro:any){
    this.total=this.total-seguro;
    this.subtotal=this.total- (this.total*.16)
    this.iva=this.total*.16
  
}

  }