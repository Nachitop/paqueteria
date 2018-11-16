import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth:Auth
  header={

    
  };
  
  constructor() { }

  getHeader(){
    this.auth=JSON.parse(localStorage.getItem('auth'));
    this.header={
      headers:{"x-access-token":this.auth.accessToken, "user":this.auth.data},
    }
    return this.header
  }
}
