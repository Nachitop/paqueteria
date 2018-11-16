import { Component, OnInit } from '@angular/core';
import {DataserviceService} from '../../services/dataservice.service'
import { Cotizacion } from 'src/app/models/cotizacion.model';
import {CpService} from '../../services/cp.service';
import { CP } from 'src/app/models/cp.model';

declare let paypal: any;
 

@Component({
  selector: 'app-confirmarenvio',
  templateUrl: './confirmarenvio.component.html',
  styleUrls: ['./confirmarenvio.component.css']
})
export class ConfirmarenvioComponent implements OnInit {



  cotizacion:Cotizacion= new Cotizacion()
  cp:CP= new CP();
  lugar_origen:any;
  lugar_destino:any;
  dimensiones:any;
  constructor(private data:DataserviceService, private cpService:CpService) {
    this.data.currentSomeDataChanges.subscribe(res=>{
      this.cotizacion=res as Cotizacion;
      this.dimensiones=this.cotizacion.obtenerDimensiones();
      this.obtenerCPOrigen(this.cotizacion.cp_origen);
      this.obtenerCPDestino(this.cotizacion.cp_destino);
      console.log(this.lugar_destino);
      console.log(this.lugar_origen);
    });

    

   }

  ngOnInit() {
   
  }

  obtenerCPOrigen(cp:any){
     this.cpService.obtenerCP(cp).subscribe(res=>{
       this.cp= res as CP
      this.lugar_origen= this.cp.municipio + ", "+ this.cp.estado+"."
      
    });
  }
  obtenerCPDestino(cp:any){
    this.cpService.obtenerCP(cp).subscribe(res=>{
      this.cp= res as CP
     this.lugar_destino= this.cp.municipio + ", "+ this.cp.estado+"."
     
   });
 }





 addScript: boolean = false;
 paypalLoad: boolean = true;
 
 finalAmount: number = 1;

 paypalConfig = {
   env: 'sandbox',
   client: {
     sandbox: 'AdTWoS3F3ItYJ4aNdDvt3qNUtCvu0sVRG-CEbWAD5qHOFGBioL4s4XwPIUA_ZBzGA48S_lJPfvP-cpID',
     production: '<your-production-key here>'
   },
   commit: true,
   payment: (data, actions) => {
     return actions.payment.create({
       payment: {
         transactions: [
           { amount: { total: this.cotizacion.resumencotizacion.total, currency: 'MXN' } }
         ]
       }
     });
   },
   onAuthorize: (data, actions) => {
     return actions.payment.execute().then((payment) => {
       //Do something when payment is successful.
       console.log(payment);
     })
   }
 };

 ngAfterViewChecked(): void {
   if (!this.addScript) {
     this.addPaypalScript().then(() => {
       paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
       this.paypalLoad = false;
     })
   }
 }
 
 addPaypalScript() {
   this.addScript = true;
   return new Promise((resolve, reject) => {
     let scripttagElement = document.createElement('script');    
     scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
     scripttagElement.onload = resolve;
     document.body.appendChild(scripttagElement);
   })
 }






}
