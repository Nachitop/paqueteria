import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.model';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth:Auth
  header={

    
  };
  
  constructor(private cookie:CookieService) { }

  getHeader(){
    //this.auth=JSON.parse(this.cookie.get('auth'));
    if(this.cookie.get('auth')){
      this.auth=JSON.parse(this.cookie.get('auth'));
    }
    //this.auth=JSON.parse(localStorage.getItem('auth'));
    this.header={
      headers:{"x-access-token":this.auth.accessToken, "user":this.auth.data},
    }
    return this.header
  }

  
}
