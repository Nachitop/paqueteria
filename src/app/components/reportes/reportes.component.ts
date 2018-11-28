import { Component, OnInit } from '@angular/core';
import { Chart} from 'chart.js'
import { Auth } from 'src/app/models/auth.model';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ReportesService } from 'src/app/services/reportes.service';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  auth:Auth=new Auth();
  desde:string="";
  hasta:string="";
  chart:any[]=[{}];
  chart2:any[]=[{}];
  mensajesesion: string;
  constructor(private router:Router,private cookie:CookieService, private reporService:ReportesService) {

 
    if(this.cookie.get('auth')){
      this.auth=JSON.parse(this.cookie.get('auth'));
      if(this.auth.data2.puesto==="Gerente(a)" || this.auth.data2.puesto==="Admin"  ){
        
      }
      else{
        this.mensajesesion="No tiene permisos para acceder aquí"
        alert(this.mensajesesion);
        this.router.navigateByUrl('inicio');
      
      }
      }
      else{
        this.mensajesesion="Debes de iniciar sesión";
        alert(this.mensajesesion);
        this.router.navigateByUrl('login');
        
      }
   }

  ngOnInit() {
 
  
  }


  reporte1(){
    this.chart2=[{}];
    this.reporService.reporte1(this.auth.data2.sucursal,this.desde,this.hasta).subscribe(res=>{
      let reporte=JSON.stringify(res);
      let reporte1=JSON.parse(reporte);
      var ctx = document.getElementById("canvas");
      this.chart= new Chart(ctx,
       {
        type: 'pie',
        data: {
          datasets: [{
            data: [
              reporte1[0].normal_cantidad,
              reporte1[0].express_cantidad
            ],
            backgroundColor: [
              'blue',
              'green',
              
            ],
            label: 'Dataset 1'
          }],
          labels: [
            'Normal',
            'Express',
            
          ]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Cantidad'
        }
        }
      }
    );
  
    var ctx2 = document.getElementById("canvas2");
      this.chart2= new Chart(ctx2,
       {
        type: 'pie',
        data: {
          datasets: [{
            data: [
              reporte1[0].normal_dinero,
              reporte1[0].express_dinero
            ],
            backgroundColor: [
              'blue',
              'green',
              
            ],
            label: 'Dataset 1'
          }],
          labels: [
            'Normal',
            'Express',
            
          ]
        },
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Dinero'
        }
        }
      }
    );
      });
    }


    reporte2(){
      this.chart=[{}];
      this.reporService.reporte2(this.auth.data2.sucursal,this.desde,this.hasta).subscribe(res=>{
        let reporte=JSON.stringify(res);
        let reporte2=JSON.parse(reporte);

        var ctx = document.getElementById("canvas");
        this.chart= new Chart(ctx,
         {
          type: 'doughnut',
          data: {
            datasets: [{
              data: [
                reporte2[0].cancelada_cantidad,
                reporte2[0].otras_cantidad
              ],
              backgroundColor: [
                'red',
                'green',
                
              ],
              label: 'Dataset 1'
            }],
            labels: [
              'Canceladas',
              'No canceladas',
              
            ]
          },
          options: {
            responsive: true,
            title: {
              display: true,
              text: 'Cantidad'
          }
          }
        });

        var ctx2 = document.getElementById("canvas2");
        this.chart= new Chart(ctx2,
         {
          type: 'doughnut',
          data: {
            datasets: [{
              data: [
                reporte2[0].cancelada_dinero,
                reporte2[0].otras_dinero
              ],
              backgroundColor: [
                'red',
                'green',
                
              ],
              label: 'Dataset 1'
            }],
            labels: [
              'Canceladas',
              'No canceladas',
              
            ]
          },
          options: {
            responsive: true,
            title: {
              display: true,
              text: 'Dinero'
          }
          }
        });
       
      });
    }
}
