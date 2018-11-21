import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { NgOnChangesFeature } from '@angular/core/src/render3';
import { Funciones } from 'src/app/metodos/funciones';
import { Login } from 'src/app/models/login.model';
import { Auth } from 'src/app/models/auth.model';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  funciones:Funciones= new Funciones();
  validarEmail:boolean=true;
  auth:Auth= new Auth();
  login:Login=new Login();
  constructor(private fb:FormBuilder, private empleadoService:EmpleadoService, private router:Router, private cookie:CookieService) { }

  ngOnInit() {
    this.iniciarForm();
  }
  iniciarForm(){
    this.loginForm=this.fb.group({
      email:[this.login.email,Validators.required],
      clave:[this.login.clave,Validators.required],
    });
    this.loginForm.get('clave').disable();
    this.onChange();
  }

  onSubmit(){
    if(this.auth.auth==true){
      this.cookie.set('auth',JSON.stringify(this.auth),1)
      window.location.reload();
        this.router.navigateByUrl('inicio');
    }
  }

  onChange(){
    this.loginForm.get('email').valueChanges.subscribe(res=>{
      this.login.email=res;
      this.empleadoService.validarEmail(this.login.email).subscribe(res=>{
        if(res==1){
          this.loginForm.controls['email'].setErrors(null)
        }
        
        if(this.loginForm.controls['email'].status=="VALID"){
          this.login.email=this.login.email;
          this.loginForm.get('clave').enable();
          this.loginForm.get('clave').valueChanges.subscribe(res=>{
            this.login.clave=res;
            this.empleadoService.login(this.login).subscribe(res=>{
            
              this.auth=res as Auth;
              
             
            });
          });
        }
      });
    });
  }

}
