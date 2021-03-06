import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CotizacionComponent } from './components/cotizacion/cotizacion.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SumarPipe} from '../app/pipes/sumar.pipe';
import {HttpClientModule} from '@angular/common/http';
import { SucursalComponent } from './components/sucursal/sucursal.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { EdadPipe } from './pipes/edad.pipe';
import { TarifaComponent } from './components/tarifa/tarifa.component';
import {VehiculoComponent} from './components/vehiculo/vehiculo.component';
import { ResumencotizacionComponent } from './components/resumencotizacion/resumencotizacion.component';
import { InformacionenvioComponent } from './components/informacionenvio/informacionenvio.component';
import { RecoleccionComponent } from './components/recoleccion/recoleccion.component';
import { ConfirmarenvioComponent } from './components/confirmarenvio/confirmarenvio.component';
import { RastreoComponent } from './components/rastreo/rastreo.component';

import { EntradaalmacenComponent } from './components/entradaalmacen/entradaalmacen.component';
import { FooterComponent } from './components/footer/footer.component';
import { EntregaComponent } from './components/entrega/entrega.component';
import { CancelacionguiaComponent } from './components/cancelacionguia/cancelacionguia.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { CookieService } from 'ngx-cookie-service';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CargacamionComponent } from './components/cargacamion/cargacamion.component';
import { BitacoraviajeComponent } from './components/bitacoraviaje/bitacoraviaje.component';
import { CargarecoleccionComponent } from './components/cargarecoleccion/cargarecoleccion.component';
import { EntregasadomicilioComponent } from './components/entregasadomicilio/entregasadomicilio.component';
import { RecoleccionesadomicilioComponent } from './components/recoleccionesadomicilio/recoleccionesadomicilio.component';
import { FinalizartareaComponent } from './components/finalizartarea/finalizartarea.component';
import { ReportesComponent } from './components/reportes/reportes.component';


const routes: Routes=[
  {path:'', component:InicioComponent},
  {path:'login',component:LoginComponent},
  {path:'cotizar',component:CotizacionComponent},
  {path:'sucursal',component:SucursalComponent},
  {path:'empleado',component:EmpleadoComponent},
  {path:'tarifa',component:TarifaComponent},
  {path:'vehiculo',component:VehiculoComponent},
  {path:'resumen-cotizacion',component:ResumencotizacionComponent},
  {path:'informacion-envio',component:InformacionenvioComponent},
  {path:'recoleccion',component:RecoleccionComponent},
  {path:'confirmar-envio',component:ConfirmarenvioComponent},
  {path:'rastreo',component:RastreoComponent},
  {path:'entrada-almacen',component:EntradaalmacenComponent},
  {path:'entrega',component:EntregaComponent},
  {path:'cancelacion-guia',component:CancelacionguiaComponent},
  {path:'servicios',component:ServicioComponent},
  {path:'carga-camion',component:CargacamionComponent},
  {path:'bitacora-viaje',component:BitacoraviajeComponent},
  {path:'carga-recoleccion',component:CargarecoleccionComponent},
  {path:'entregas-a-domicilio',component:EntregasadomicilioComponent},
  {path:'recolecciones-a-domicilio',component:RecoleccionesadomicilioComponent},
  {path:'finalizar-tarea',component:FinalizartareaComponent},
  {path:'reportes',component:ReportesComponent},
  
  
  {path:'**',component:InicioComponent},
  
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    InicioComponent,
    CotizacionComponent,
    SumarPipe,
    SucursalComponent,
    EmpleadoComponent,
    EdadPipe,
    TarifaComponent,
    VehiculoComponent,
    ResumencotizacionComponent,
    InformacionenvioComponent,
    RecoleccionComponent,
    ConfirmarenvioComponent,
    RastreoComponent,
    EntradaalmacenComponent,
    FooterComponent,
    EntregaComponent,
    CancelacionguiaComponent,
    ServicioComponent,
    CargacamionComponent,
    BitacoraviajeComponent,
    CargarecoleccionComponent,
    EntregasadomicilioComponent,
    RecoleccionesadomicilioComponent,
    FinalizartareaComponent,
    ReportesComponent,
  
  
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes),FormsModule ,HttpClientModule, ReactiveFormsModule, NgbModalModule

  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule { }
